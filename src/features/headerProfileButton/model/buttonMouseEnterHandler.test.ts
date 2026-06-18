import { describe, it, expect, vi } from "vitest";
import { buttonMouseEnterHandler } from "./buttonMouseEnterHandler";

describe("buttonMouseEnterHandler - открывает выпадающее меню при наведении", () => {
    it("Устанавливает isOpen в true", () => {
        const setIsOpen = vi.fn();

        buttonMouseEnterHandler(setIsOpen);

        expect(setIsOpen).toHaveBeenCalledWith(true);
    });
});
