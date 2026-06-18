import { describe, it, expect, vi } from "vitest";
import { buttonMouseLeaveHandler } from "./buttonMouseLeaveHandler";

describe("buttonMouseLeaveHandler - закрывает выпадающее меню при уходе курсора", () => {
    it("Устанавливает isOpen в false", () => {
        const setIsOpen = vi.fn();

        buttonMouseLeaveHandler(setIsOpen);

        expect(setIsOpen).toHaveBeenCalledWith(false);
    });
});
