import {describe, it, expect, vi, afterEach} from "vitest";
import {codeSubmitValidHandler} from "./codeSubmitValidHandler";

describe("codeSubmitValidHandler - отправка кода подтверждения смены email", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Показывает ошибку и устанавливает флаг при коде короче 6 символов", () => {
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const setIsEmailSent = vi.fn();
        const resetEmailForm = vi.fn();

        codeSubmitValidHandler({code: "123"}, dispatch, setErrorCode, setIsEmailSent, resetEmailForm);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0].payload.message).toBe("toast.wrongCodeLength");
        expect(setErrorCode).toHaveBeenCalledWith(true);
        expect(setIsEmailSent).not.toHaveBeenCalled();
    });

    it("Сбрасывает ошибку и возвращает к шагу email при корректном 6-значном коде", () => {
        vi.useFakeTimers();
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const setIsEmailSent = vi.fn();
        const resetEmailForm = vi.fn();

        codeSubmitValidHandler({code: "123456"}, dispatch, setErrorCode, setIsEmailSent, resetEmailForm);

        expect(setErrorCode).toHaveBeenCalledWith(false);
        expect(setIsEmailSent).toHaveBeenCalledWith(false);
        vi.runAllTimers();
        expect(resetEmailForm).toHaveBeenCalled();
    });

    it("Не вызывает dispatch при корректном коде", () => {
        vi.useFakeTimers();
        const dispatch = vi.fn();

        codeSubmitValidHandler({code: "123456"}, dispatch, vi.fn(), vi.fn(), vi.fn());

        expect(dispatch).not.toHaveBeenCalled();
    });
});
