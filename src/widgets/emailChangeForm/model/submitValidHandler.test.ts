import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";

describe("submitValidHandler - успешная отправка формы изменения email", () => {
    it("Переключает форму в шаг ввода кода", () => {
        const setValue = vi.fn();
        const setIsEmailSent = vi.fn();
        const setNewEmailResult = vi.fn();

        submitValidHandler(
            setValue,
            setIsEmailSent,
            setNewEmailResult,
            "new@example.com"
        );

        expect(setIsEmailSent).toHaveBeenCalledWith(true);
    });

    it("Сохраняет новый email для отображения в тексте подтверждения", () => {
        const setValue = vi.fn();
        const setIsEmailSent = vi.fn();
        const setNewEmailResult = vi.fn();

        submitValidHandler(
            setValue,
            setIsEmailSent,
            setNewEmailResult,
            "new@example.com"
        );

        expect(setNewEmailResult).toHaveBeenCalledWith("new@example.com");
    });

    it("Сбрасывает поля oldEmail и newEmail", () => {
        const setValue = vi.fn();
        const setIsEmailSent = vi.fn();
        const setNewEmailResult = vi.fn();

        submitValidHandler(
            setValue,
            setIsEmailSent,
            setNewEmailResult,
            "new@example.com"
        );

        expect(setValue).toHaveBeenCalledWith("oldEmail", "");
        expect(setValue).toHaveBeenCalledWith("newEmail", "");
    });
});
