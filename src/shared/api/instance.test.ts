import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../tests/mswServer";
import { api } from "./instance";
import { store } from "app/store";
import { encryptToString, decryptFromString } from "../lib/crypto";

const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY;

const clearCookies = () => {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; max-age=0`;
    });
};

const getCookieByName = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));

    return match ? match[1] : null;
};

describe("instance - перехватчик запросов axios", () => {
    beforeEach(() => {
        clearCookies();
    });

    afterEach(() => {
        clearCookies();
    });

    it("Не подставляет заголовок Authorization для эндпоинтов из refreshIgnoreEndpoints", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.post("*/auth/login", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({});
            })
        );

        document.cookie = `accessToken=${await encryptToString("access-token", CRYPTO_KEY)}; path=/`;

        await api.post("/auth/login", {});

        expect(receivedAuth).toBeNull();
    });

    it("Подставляет расшифрованный accessToken из куки в заголовок Authorization", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/protected", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({});
            })
        );

        document.cookie = `accessToken=${await encryptToString("access-token", CRYPTO_KEY)}; path=/`;

        await api.get("/protected");

        expect(receivedAuth).toBe("Bearer access-token");
    });

    it("Не подставляет заголовок Authorization при отсутствии токенов в куки", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/protected", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({});
            })
        );

        await api.get("/protected");

        expect(receivedAuth).toBeNull();
    });

    it("При отсутствии accessToken и наличии refreshToken обновляет токены через /auth/refresh", async () => {
        let receivedAuth: string | null = "не вызывался";
        server.use(
            http.get("*/protected", ({ request }) => {
                receivedAuth = request.headers.get("Authorization");
                return HttpResponse.json({});
            }),
            http.post("*/auth/refresh", () =>
                HttpResponse.json({
                    accessToken: "new-access",
                    refreshToken: "new-refresh",
                    accessTokenExpiresIn: 60000,
                    refreshTokenExpiresIn: 120000
                })
            )
        );

        document.cookie = `refreshToken=${await encryptToString("old-refresh", CRYPTO_KEY)}; path=/`;

        await api.get("/protected");

        expect(receivedAuth).toBe("Bearer new-access");

        const newAccessToken = getCookieByName("accessToken");
        const newRefreshToken = getCookieByName("refreshToken");
        expect(newAccessToken).not.toBeNull();
        expect(newRefreshToken).not.toBeNull();
        expect(await decryptFromString(newAccessToken as string, CRYPTO_KEY)).toBe(
            "new-access"
        );
        expect(await decryptFromString(newRefreshToken as string, CRYPTO_KEY)).toBe(
            "new-refresh"
        );
    });

    it("Показывает уведомление об ошибке сервера, если /auth/refresh возвращает ошибку с ответом", async () => {
        server.use(
            http.get("*/protected", () => HttpResponse.json({})),
            http.post("*/auth/refresh", () =>
                HttpResponse.json({ message: "error" }, { status: 500 })
            )
        );

        document.cookie = `refreshToken=${await encryptToString("old-refresh", CRYPTO_KEY)}; path=/`;

        await api.get("/protected");

        const queue = store.getState().toast.queue;
        expect(queue.at(-1)).toMatchObject({ message: "api.serverError", type: "error" });
    });

    it("Показывает уведомление о сетевой ошибке, если /auth/refresh не дошёл до сервера", async () => {
        server.use(
            http.get("*/protected", () => HttpResponse.json({})),
            http.post("*/auth/refresh", () => HttpResponse.error())
        );

        document.cookie = `refreshToken=${await encryptToString("old-refresh", CRYPTO_KEY)}; path=/`;

        await api.get("/protected");

        const queue = store.getState().toast.queue;
        expect(queue.at(-1)).toMatchObject({
            message: "api.networkError",
            type: "error"
        });
    });
});
