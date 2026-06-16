import { describe, it, expect, beforeEach } from "vitest";
import { clearCookiesTokens } from "./clearCookiesTokens";
import { getCookieByName } from "./getCookieByName";

const clearCookies = () => {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; max-age=0`;
    });
};

describe("clearCookiesTokens - удаляет куки-файлы токенов", () => {
    beforeEach(() => {
        clearCookies();
    });

    it("Удаляет accessToken, accessTokenExpiresAt, refreshToken и refreshTokenExpiresAt", () => {
        document.cookie = "accessToken=access;path=/";
        document.cookie = "accessTokenExpiresAt=123;path=/";
        document.cookie = "refreshToken=refresh;path=/";
        document.cookie = "refreshTokenExpiresAt=456;path=/";

        clearCookiesTokens();

        expect(getCookieByName("accessToken")).toBeNull();
        expect(getCookieByName("accessTokenExpiresAt")).toBeNull();
        expect(getCookieByName("refreshToken")).toBeNull();
        expect(getCookieByName("refreshTokenExpiresAt")).toBeNull();
    });

    it("Не выбрасывает ошибку, если куки-файлы токенов отсутствуют", () => {
        expect(() => clearCookiesTokens()).not.toThrow();
    });

    it("Не затрагивает другие куки-файлы", () => {
        document.cookie = "otherCookie=value;path=/";

        clearCookiesTokens();

        expect(getCookieByName("otherCookie")).toBe("value");
    });
});
