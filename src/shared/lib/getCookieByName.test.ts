import {describe, it, expect, beforeEach} from "vitest";
import {getCookieByName} from "./getCookieByName";

const clearCookies = () => {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; max-age=0`;
    });
};

describe("getCookieByName - возвращает значение куки-файла по имени", () => {
    beforeEach(() => {
        clearCookies();
    });

    it("Возвращает null если куки-файла нет", () => {
        expect(getCookieByName("test")).toBeNull();
    });

    it("Возвращает значение существующего куки-файла", () => {
        document.cookie = "test=hello";
        expect(getCookieByName("test")).toBe("hello");
    });

    it("Возвращает null если куки-файл не найден среди нескольких", () => {
        document.cookie = "foo=bar";
        document.cookie = "baz=qux";
        expect(getCookieByName("missing")).toBeNull();
    });

    it("Не совпадает с подстрокой в имени другого куки-файла", () => {
        document.cookie = "myname=value";
        expect(getCookieByName("name")).toBeNull();
    });
});
