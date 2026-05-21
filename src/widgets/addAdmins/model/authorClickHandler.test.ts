import {describe, it, expect, vi} from "vitest";
import type {MouseEvent} from "react";
import {authorClickHandler} from "./authorClickHandler";

describe("authorClickHandler - блокировка навигации для автора", () => {
    it("Вызывает preventDefault", () => {
        const e = {preventDefault: vi.fn()} as unknown as MouseEvent;

        authorClickHandler(e);

        expect(e.preventDefault).toHaveBeenCalled();
    });
});
