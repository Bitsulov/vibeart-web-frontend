import { describe, expect, it, vi } from "vitest";
import { postClickHandler } from "./postClickHandler";

describe("postClickHandler - переход на страницу поста", () => {
    it("Вызывает navigate с путём /post/:UUID", () => {
        const navigate = vi.fn();

        postClickHandler(navigate, "00000000-0000-4000-8000-00000000000b");

        expect(navigate).toHaveBeenCalledWith(
            "/post/00000000-0000-4000-8000-00000000000b"
        );
    });
});
