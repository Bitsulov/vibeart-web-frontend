import {describe, it, expect, vi} from "vitest";
import type {ChangeEvent} from "react";
import {changeSearchHandler} from "./changeSearchHandler";

describe("changeSearchHandler - обновление строки поиска", () => {
    it("Вызывает setValue с введённым значением", () => {
        const setValue = vi.fn();
        const e = {target: {value: "Alice"}} as ChangeEvent<HTMLInputElement>;

        changeSearchHandler(e, setValue);

        expect(setValue).toHaveBeenCalledWith("Alice");
    });

    it("Передаёт пустую строку если поле очищено", () => {
        const setValue = vi.fn();
        const e = {target: {value: ""}} as ChangeEvent<HTMLInputElement>;

        changeSearchHandler(e, setValue);

        expect(setValue).toHaveBeenCalledWith("");
    });
});
