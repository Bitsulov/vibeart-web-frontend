import { describe, it, expect, vi } from "vitest";
import { submitInvalidHandler } from "./submitInvalidHandler";

describe("submitInvalidHandler - ошибка валидации формы смены пароля", () => {
    it("Вызывает dispatch с toast при ошибке oldPassword", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            { oldPassword: { message: "toast.requiredPassword", type: "required" } },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.payload.message).toBe("toast.requiredPassword");
        expect(action.payload.type).toBe("error");
    });

    it("Вызывает dispatch при ошибке newPassword", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            { newPassword: { message: "errors.shortPassword", type: "minLength" } },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0].payload.message).toBe("errors.shortPassword");
    });

    it("Вызывает dispatch при ошибке confirmNewPassword", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            {
                confirmNewPassword: {
                    message: "toast.notSamePasswords",
                    type: "validate"
                }
            },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
    });

    it("Не вызывает dispatch если нет ошибок", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({}, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });
});
