import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifySuccessHandler } from "./verifySuccessHandler";
import { setUserInfo } from "entities/user";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { AuthResponse } from "entities/user";
import type { QueryClient } from "@tanstack/react-query";

vi.mock("shared/lib/crypto", () => ({
    encryptToString: vi.fn(async (text: string) => `encrypted-${text}`)
}));

const clearCookies = () => {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; max-age=0`;
    });
};

function createResponse(): AxiosResponse<AuthResponse> {
    return {
        data: {
            uuid: "00000000-0000-4000-8000-00000000000a",
            accessToken: "access-token",
            refreshToken: "refresh-token",
            accessTokenExpiresIn: 60000,
            refreshTokenExpiresIn: 120000
        }
    } as AxiosResponse<AuthResponse>;
}

const mockQueryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

describe("verifySuccessHandler - обрабатывает успешную верификацию кода", () => {
    beforeEach(() => {
        clearCookies();
    });

    afterEach(() => {
        clearCookies();
    });

    it("Сохраняет зашифрованные токены в куки-файлы", async () => {
        await verifySuccessHandler(
            createResponse(),
            { email: "test@example.com", verificationCode: "123456" },
            vi.fn(),
            mockQueryClient,
            vi.fn()
        );

        expect(document.cookie).toContain("accessToken=encrypted-access-token");
        expect(document.cookie).toContain("refreshToken=encrypted-refresh-token");
        expect(document.cookie).toContain("accessTokenExpiresAt=");
        expect(document.cookie).toContain("refreshTokenExpiresAt=");
    });

    it("Записывает данные авторизованного пользователя в Redux", async () => {
        const dispatch = vi.fn();

        await verifySuccessHandler(
            createResponse(),
            { email: "test@example.com", verificationCode: "123456" },
            dispatch,
            mockQueryClient,
            vi.fn()
        );

        expect(dispatch).toHaveBeenCalledWith(
            setUserInfo({
                UUID: "00000000-0000-4000-8000-00000000000a",
                email: "test@example.com",
                isAuthenticated: true,
                accessToken: "encrypted-access-token",
                refreshToken: "encrypted-refresh-token",
                accessTokenExpiresIn: 60000,
                refreshTokenExpiresIn: 120000
            })
        );
    });

    it("Показывает уведомление об успешной регистрации", async () => {
        const dispatch = vi.fn();

        await verifySuccessHandler(
            createResponse(),
            { email: "test@example.com", verificationCode: "123456" },
            dispatch,
            mockQueryClient,
            vi.fn()
        );

        expect(
            dispatch.mock.calls.some(
                call =>
                    call[0]?.type === showToast.type &&
                    call[0]?.payload?.message === "api.verifyAccess" &&
                    call[0]?.payload?.type === "success"
            )
        ).toBe(true);
    });

    it("Перенаправляет на страницу профиля пользователя", async () => {
        const navigate = vi.fn();

        await verifySuccessHandler(
            createResponse(),
            { email: "test@example.com", verificationCode: "123456" },
            vi.fn(),
            mockQueryClient,
            navigate
        );

        expect(navigate).toHaveBeenCalledWith(
            "/profile/00000000-0000-4000-8000-00000000000a"
        );
    });
});
