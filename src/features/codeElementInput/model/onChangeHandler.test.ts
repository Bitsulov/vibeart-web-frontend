import { describe, it, expect, vi } from "vitest";
import type { ChangeEvent } from "react";
import { onChangeHandler } from "./onChangeHandler";

describe("onChangeHandler - фильтр ввода ячейки кода", () => {
    it("Устанавливает значение и вызывает onChange при вводе одной цифры", () => {
        const setValue = vi.fn();
        const onChange = vi.fn();
        const e = { target: { value: "5" } } as ChangeEvent<HTMLInputElement>;

        onChangeHandler(e, setValue, onChange);

        expect(setValue).toHaveBeenCalledWith("5");
        expect(onChange).toHaveBeenCalledWith(e);
    });

    it("Игнорирует нецифровые символы", () => {
        const setValue = vi.fn();
        const onChange = vi.fn();
        const e = { target: { value: "a" } } as ChangeEvent<HTMLInputElement>;

        onChangeHandler(e, setValue, onChange);

        expect(setValue).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
    });

    it("Игнорирует несколько цифр подряд", () => {
        const setValue = vi.fn();
        const onChange = vi.fn();
        const e = { target: { value: "12" } } as ChangeEvent<HTMLInputElement>;

        onChangeHandler(e, setValue, onChange);

        expect(setValue).not.toHaveBeenCalled();
    });

    it("Игнорирует пустую строку", () => {
        const setValue = vi.fn();
        const onChange = vi.fn();
        const e = { target: { value: "" } } as ChangeEvent<HTMLInputElement>;

        onChangeHandler(e, setValue, onChange);

        expect(setValue).not.toHaveBeenCalled();
    });
});
