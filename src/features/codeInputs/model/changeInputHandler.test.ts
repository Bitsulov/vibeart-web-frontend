import { describe, it, expect, vi } from "vitest";
import type { ChangeEvent, RefObject } from "react";
import { changeInputHandler } from "./changeInputHandler";

describe("changeInputHandler - переход к следующей ячейке кода", () => {
    it("Фокусирует следующий input при изменении", () => {
        const nextInput = { focus: vi.fn() };
        const ref = { current: [null, nextInput] } as unknown as RefObject<
            (HTMLInputElement | null)[]
        >;
        const e = { target: {} } as ChangeEvent<HTMLInputElement>;

        changeInputHandler(e, ref, 0);

        expect(nextInput.focus).toHaveBeenCalled();
    });

    it("Нет ошибок, если следующего input нет (последняя ячейка)", () => {
        const input = document.createElement("input");
        const ref = { current: [input] } as unknown as RefObject<
            (HTMLInputElement | null)[]
        >;
        const e = { target: {} } as ChangeEvent<HTMLInputElement>;

        expect(() => changeInputHandler(e, ref, 0)).not.toThrow();
    });
});
