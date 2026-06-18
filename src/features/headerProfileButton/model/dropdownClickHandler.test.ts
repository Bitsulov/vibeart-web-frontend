import { describe, it, expect, vi } from "vitest";
import { dropdownClickHandler } from "./dropdownClickHandler";
import type { MouseEvent } from "react";

describe("dropdownClickHandler - предотвращает переход по ссылке при клике на меню", () => {
    it("Вызывает preventDefault на событии клика", () => {
        const e = { preventDefault: vi.fn() } as unknown as MouseEvent;

        dropdownClickHandler(e);

        expect(e.preventDefault).toHaveBeenCalledOnce();
    });
});
