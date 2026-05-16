import {describe, it, expect, vi, afterEach} from "vitest";
import {codeSubmitValidHandler} from "./codeSubmitValidHandler";

describe("codeSubmitValidHandler - отправка кода подтверждения смены пароля", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Показывает ошибку и устанавливает флаг при коде короче 6 символов", () => {
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const setIsPasswordSent = vi.fn();
        const resetPasswordForm = vi.fn();

        codeSubmitValidHandler({code: "12"}, dispatch, setErrorCode, setIsPasswordSent, resetPasswordForm);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0].payload.message).toBe("toast.wrongCodeLength");
        expect(setErrorCode).toHaveBeenCalledWith(true);
        expect(setIsPasswordSent).not.toHaveBeenCalled();
    });

    it("Сбрасывает ошибку и возвращает к шагу пароля при корректном 6-значном коде", () => {
        vi.useFakeTimers();
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const setIsPasswordSent = vi.fn();
        const resetPasswordForm = vi.fn();

        codeSubmitValidHandler({code: "123456"}, dispatch, setErrorCode, setIsPasswordSent, resetPasswordForm);

        expect(setErrorCode).toHaveBeenCalledWith(false);
        expect(setIsPasswordSent).toHaveBeenCalledWith(false);
        vi.runAllTimers();
        expect(resetPasswordForm).toHaveBeenCalled();
    });

    it("Не вызывает dispatch при корректном коде", () => {
        vi.useFakeTimers();
        const dispatch = vi.fn();

        codeSubmitValidHandler({code: "123456"}, dispatch, vi.fn(), vi.fn(), vi.fn());

        expect(dispatch).not.toHaveBeenCalled();
    });
});
