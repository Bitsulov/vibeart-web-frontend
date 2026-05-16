import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CodeInputs} from "./codeInputs";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe("CodeInputs - 6-значное поле ввода кода", () => {
    it("Рендерит 6 ячеек для ввода", () => {
        renderWithProviders(<CodeInputs setCode={vi.fn()} isError={false} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(6);
    });

    it("Вызывает setCode при монтировании с пустой строкой", () => {
        const setCode = vi.fn();
        renderWithProviders(<CodeInputs setCode={setCode} isError={false} />);

        expect(setCode).toHaveBeenCalledWith("");
    });

    it("Вызывает setCode с введённой цифрой после ввода", async () => {
        const user = userEvent.setup();
        const setCode = vi.fn();
        renderWithProviders(<CodeInputs setCode={setCode} isError={false} />);

        const inputs = screen.getAllByRole("textbox");
        await user.type(inputs[0], "3");

        const lastCall = setCode.mock.calls.at(-1)?.[0] as string;
        expect(lastCall[0]).toBe("3");
    });

    it("Не принимает нецифровые символы", async () => {
        const user = userEvent.setup();
        const setCode = vi.fn();
        renderWithProviders(<CodeInputs setCode={setCode} isError={false} />);

        const inputs = screen.getAllByRole("textbox");
        await user.type(inputs[0], "a");

        const calls = setCode.mock.calls.map(c => c[0] as string);
        expect(calls.every(v => v === "")).toBe(true);
    });
});
