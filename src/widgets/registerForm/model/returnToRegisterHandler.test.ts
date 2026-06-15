import { describe, it, expect, vi } from "vitest";
import { returnToRegisterHandler } from "./returnToRegisterHandler";

describe("returnToRegisterHandler - возвращает форму регистрации из режима ввода кода", () => {
    it("Сбрасывает признак отправки письма с кодом", () => {
        const setIsEmailSent = vi.fn();
        const codeReset = vi.fn();

        returnToRegisterHandler(setIsEmailSent, codeReset);

        expect(setIsEmailSent).toHaveBeenCalledWith(false);
    });

    it("Сбрасывает форму кода подтверждения", () => {
        const setIsEmailSent = vi.fn();
        const codeReset = vi.fn();

        returnToRegisterHandler(setIsEmailSent, codeReset);

        expect(codeReset).toHaveBeenCalled();
    });
});
