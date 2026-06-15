import { describe, it, expect, vi } from "vitest";
import { codeSubmitValidHandler } from "./codeSubmitValidHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { AuthResponse } from "entities/user";

describe("codeSubmitValidHandler - обрабатывает отправку формы с кодом подтверждения", () => {
    it("Показывает ошибку и помечает поле невалидным, если код не из 6 цифр", () => {
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const setIsEmailSent = vi.fn();
        const resetEmailForm = vi.fn();
        const submit = vi.fn();

        codeSubmitValidHandler(
            { code: "123" },
            dispatch,
            setErrorCode,
            setIsEmailSent,
            resetEmailForm,
            "test@example.com",
            submit
        );

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "toast.wrongCodeLength", type: "error" }
        });
        expect(setErrorCode).toHaveBeenCalledWith(true);
        expect(submit).not.toHaveBeenCalled();
        expect(setIsEmailSent).not.toHaveBeenCalled();
    });

    it("Сбрасывает признак ошибки, переключает форму и отправляет код на верификацию", async () => {
        vi.useFakeTimers();

        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const setIsEmailSent = vi.fn();
        const resetEmailForm = vi.fn();
        const submit = vi.fn<(data: { email: string; verificationCode: string }) => Promise<AxiosResponse<AuthResponse>>>();

        codeSubmitValidHandler(
            { code: "123456" },
            dispatch,
            setErrorCode,
            setIsEmailSent,
            resetEmailForm,
            "test@example.com",
            submit
        );

        expect(setErrorCode).toHaveBeenCalledWith(false);
        expect(setIsEmailSent).toHaveBeenCalledWith(false);
        expect(submit).toHaveBeenCalledWith({ email: "test@example.com", verificationCode: "123456" });
        expect(resetEmailForm).not.toHaveBeenCalled();

        vi.runAllTimers();

        expect(resetEmailForm).toHaveBeenCalled();

        vi.useRealTimers();
    });
});
