import {describe, it, expect, vi} from "vitest";
import {searchChangeHandler} from "./searchChangeHandler";
import React from "react";

describe("searchChangeHandler - обработчик поля поиска чатов", () => {
    it("Вызывает setValue с введённым значением", () => {
        const setValue = vi.fn();
        const event = {target: {value: "Иван"}} as React.ChangeEvent<HTMLInputElement>;

        searchChangeHandler(event, setValue);

        expect(setValue).toHaveBeenCalledWith("Иван");
    });

    it("Вызывает setValue с пустой строкой при очистке поля", () => {
        const setValue = vi.fn();
        const event = {target: {value: ""}} as React.ChangeEvent<HTMLInputElement>;

        searchChangeHandler(event, setValue);

        expect(setValue).toHaveBeenCalledWith("");
    });
});
