import {describe, it, expect, vi} from "vitest";
import {submitValidHandler} from "./submitValidHandler";

describe("submitValidHandler - обработчик успешной отправки формы связи с администрацией", () => {
    it("Сбрасывает поле text после отправки", () => {
        const setValue = vi.fn();
        const dispatch = vi.fn();

        submitValidHandler(setValue, dispatch);

        expect(setValue).toHaveBeenCalledWith("text", "");
    });

    it("Показывает уведомление об успешной отправке", () => {
        const setValue = vi.fn();
        const dispatch = vi.fn();

        submitValidHandler(setValue, dispatch);

        expect(dispatch).toHaveBeenCalled();
    });
});
