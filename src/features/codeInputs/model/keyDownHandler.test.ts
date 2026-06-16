import { describe, it, expect, vi } from "vitest";
import type { KeyboardEvent, RefObject } from "react";
import { keyDownHandler } from "./keyDownHandler";

describe("keyDownHandler - обработка Backspace в ячейке кода", () => {
    it("Очищает значение и фокусирует предыдущий input при нажатии Backspace", () => {
        const prevInput = { focus: vi.fn() };
        const ref = { current: [prevInput, null] } as unknown as RefObject<
            (HTMLInputElement | null)[]
        >;
        const setValue = vi.fn();
        const e = {
            key: "Backspace",
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        keyDownHandler(e, ref, 1, setValue);

        expect(e.preventDefault).toHaveBeenCalled();
        expect(setValue).toHaveBeenCalledWith("");
        expect(prevInput.focus).toHaveBeenCalled();
    });

    it("Ничего не делает при нажатии других клавиш", () => {
        const ref = { current: [null, null] } as unknown as RefObject<
            (HTMLInputElement | null)[]
        >;
        const setValue = vi.fn();
        const e = {
            key: "ArrowLeft",
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        keyDownHandler(e, ref, 1, setValue);

        expect(e.preventDefault).not.toHaveBeenCalled();
        expect(setValue).not.toHaveBeenCalled();
    });
});
