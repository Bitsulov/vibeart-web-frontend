import { describe, it, expect, vi } from "vitest";
import { submitInvalidHandler } from "./submitInvalidHandler";

describe("submitInvalidHandler - обработчик некорректной отправки формы связи с администрацией", () => {
    it("Показывает уведомление, если у поля text есть сообщение об ошибке", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            { text: { message: "toast.emptyReport", type: "required" } },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
    });

    it("Показывает уведомление об ошибке maxLength", () => {
        const dispatch = vi.fn();

        submitInvalidHandler(
            { text: { message: "toast.longReport", type: "maxLength" } },
            dispatch
        );

        expect(dispatch).toHaveBeenCalled();
    });

    it("Не показывает уведомление, если сообщение пустое", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({ text: { message: "", type: "required" } }, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });

    it("Не показывает уведомление, если ошибок нет", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({}, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });
});
