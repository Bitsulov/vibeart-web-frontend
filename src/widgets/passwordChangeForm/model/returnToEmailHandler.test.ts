import { describe, it, expect, vi } from "vitest";
import { returnToEmailHandler } from "./returnToEmailHandler";

describe("returnToEmailHandler - возврат к шагу ввода пароля", () => {
    it("Устанавливает isPasswordSent в false", () => {
        const setIsEmailSent = vi.fn();
        const reset = vi.fn();
        const codeReset = vi.fn();

        returnToEmailHandler(setIsEmailSent, reset, codeReset);

        expect(setIsEmailSent).toHaveBeenCalledWith(false);
    });

    it("Сбрасывает обе формы", () => {
        const setIsEmailSent = vi.fn();
        const reset = vi.fn();
        const codeReset = vi.fn();

        returnToEmailHandler(setIsEmailSent, reset, codeReset);

        expect(reset).toHaveBeenCalled();
        expect(codeReset).toHaveBeenCalled();
    });
});
