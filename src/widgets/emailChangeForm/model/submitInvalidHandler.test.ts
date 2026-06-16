import { describe, it, expect, vi } from "vitest";
import { submitInvalidHandler } from "./submitInvalidHandler";

describe("submitInvalidHandler - ошибка валидации формы изменения email", () => {
    it("Вызывает dispatch с toast при ошибке oldEmail", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            { oldEmail: { message: "toast.requiredEmail", type: "required" } },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.payload.message).toBe("toast.requiredEmail");
        expect(action.payload.type).toBe("error");
    });

    it("Вызывает dispatch при ошибке newEmail", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            { newEmail: { message: "toast.wrongEmail", type: "pattern" } },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.payload.message).toBe("toast.wrongEmail");
    });

    it("Не вызывает dispatch если нет ошибок", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({}, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });
});
