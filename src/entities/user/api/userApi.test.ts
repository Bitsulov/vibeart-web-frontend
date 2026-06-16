import { describe, it, expect } from "vitest";
import { register, sendCode, verify, login, refresh, getPrincipalUser } from "./userApi";
import { authResponseMock, userDetailResponseMock } from "../const/mockConst";

describe("userApi - запросы к API авторизации и регистрации", () => {
    it("register отправляет данные регистрации на /auth/register", async () => {
        const response = await register({
            email: "test@example.com",
            password: "123456",
            confirmPassword: "123456"
        });

        expect(response.data).toBe("ok");
    });

    it("sendCode отправляет email на /auth/send", async () => {
        const response = await sendCode({ email: "test@example.com" });

        expect(response.data).toBe("ok");
    });

    it("verify отправляет email и код подтверждения на /auth/verify", async () => {
        const response = await verify({
            email: "test@example.com",
            verificationCode: "123456"
        });

        expect(response.data).toEqual(authResponseMock);
    });

    it("login отправляет email и пароль на /auth/login", async () => {
        const response = await login({ email: "test@example.com", password: "123456" });

        expect(response.data).toEqual(authResponseMock);
    });

    it("refresh отправляет refreshToken на /auth/refresh", async () => {
        const response = await refresh({ refreshToken: "old-refresh" });

        expect(response.data).toEqual(authResponseMock);
    });

    it("getPrincipalUser получает профиль текущего пользователя", async () => {
        const response = await getPrincipalUser();

        expect(response.data).toEqual(userDetailResponseMock);
    });
});
