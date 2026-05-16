import {describe, it, expect, vi} from "vitest";
import {submitInvalidHandler} from "./submitInvalidHandler";

describe("submitInvalidHandler - ошибка валидации формы настроек", () => {
    it("Вызывает dispatch с toast при ошибке title", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({title: {message: "toast.emptyName", type: "required"}}, dispatch);

        expect(dispatch).toHaveBeenCalled();
        const action = dispatch.mock.calls[0][0];
        expect(action.payload.message).toBe("toast.emptyName");
        expect(action.payload.type).toBe("error");
    });

    it("Вызывает dispatch при ошибке description", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({description: {message: "toast.longDescription", type: "maxLength"}}, dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0].payload.message).toBe("toast.longDescription");
    });

    it("Не вызывает dispatch если нет ошибок", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({}, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });
});
