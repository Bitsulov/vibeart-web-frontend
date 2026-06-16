import { describe, it, expect, vi } from "vitest";
import { closeModalHandler } from "./closeModalHandler";

describe("closeModalHandler - закрывает модальное окно для куки и сохраняет согласие", () => {
    it("Вызывает setIsShow с false", () => {
        const setIsShow = vi.fn();
        closeModalHandler(setIsShow);
        expect(setIsShow).toHaveBeenCalledWith(false);
    });
});
