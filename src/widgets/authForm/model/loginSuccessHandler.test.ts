import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { loginSuccessHandler } from "./loginSuccessHandler";
import { setUserInfo } from "entities/user";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { AuthResponse } from "entities/user";
import type { QueryClient } from "@tanstack/react-query";
import type { IAuthForm } from "../lib/types";

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

const request: IAuthForm = { email: "test@example.com", password: "secret" };
const mockQueryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

describe("loginSuccessHandler - обрабатывает успешный вход в аккаунт", () => {
    beforeEach(() => {
        clearCookies();
    });

    afterEach(() => {
        clearCookies();
    });

    it("Сохраняет зашифрованные токены в куки-файлы", async () => {
        await loginSuccessHandler(
            createResponse(),
            request,
            vi.fn(),
            vi.fn(),
            mockQueryClient,
            vi.fn()
        );

        expect(document.cookie).toContain("accessToken=encrypted-access-token");
        expect(document.cookie).toContain("refreshToken=encrypted-refresh-token");
        expect(document.cookie).toContain("accessTokenExpiresAt=");
        expect(document.cookie).toContain("refreshTokenExpiresAt=");
    });

    it("Показывает уведомление об успешном входе", async () => {
        const dispatch = vi.fn();

        await loginSuccessHandler(
            createResponse(),
            request,
            vi.fn(),
            dispatch,
            mockQueryClient,
            vi.fn()
        );

        expect(
            dispatch.mock.calls.some(
                call =>
                    call[0]?.type === showToast.type &&
                    call[0]?.payload?.message === "api.loginAccess" &&
                    call[0]?.payload?.type === "success"
            )
        ).toBe(true);
    });

    it("Записывает данные авторизованного пользователя в Redux", async () => {
        const dispatch = vi.fn();

        await loginSuccessHandler(
            createResponse(),
            request,
            vi.fn(),
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

    it("Сбрасывает поля email и password в форме", async () => {
        const setValue = vi.fn();

        await loginSuccessHandler(
            createResponse(),
            request,
            setValue,
            vi.fn(),
            mockQueryClient,
            vi.fn()
        );

        expect(setValue).toHaveBeenCalledWith("email", "");
        expect(setValue).toHaveBeenCalledWith("password", "");
    });

    it("Сбрасывает кеш пользователя в TanStack Query", async () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        await loginSuccessHandler(
            createResponse(),
            request,
            vi.fn(),
            vi.fn(),
            queryClient,
            vi.fn()
        );

        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
            queryKey: ["user"]
        });
    });

    it("Перенаправляет в галерею", async () => {
        const navigate = vi.fn();

        await loginSuccessHandler(
            createResponse(),
            request,
            vi.fn(),
            vi.fn(),
            mockQueryClient,
            navigate
        );

        expect(navigate).toHaveBeenCalledWith("/gallery");
    });
});
