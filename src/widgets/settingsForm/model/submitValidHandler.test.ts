import {describe, it, expect, vi} from "vitest";
import {submitValidHandler} from "./submitValidHandler";

describe("submitValidHandler - сброс формы настроек после сохранения", () => {
    it("Сбрасывает все поля формы настроек", () => {
        const setValue = vi.fn();

        submitValidHandler(setValue);

        expect(setValue).toHaveBeenCalledWith("avatar", "");
        expect(setValue).toHaveBeenCalledWith("title", "");
        expect(setValue).toHaveBeenCalledWith("description", "");
        expect(setValue).toHaveBeenCalledWith("id", "");
    });
});
