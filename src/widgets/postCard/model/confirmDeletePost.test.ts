import { describe, it, expect, vi } from "vitest";
import { confirmDeletePost } from "./confirmDeletePost";

describe("confirmDeletePost - переходит в профиль автора после удаления", () => {
    it("Вызывает navigate с путем к профилю автора", () => {
        const navigate = vi.fn();
        confirmDeletePost(navigate, "00000000-0000-4000-8000-00000000000b");
        expect(navigate).toHaveBeenCalledWith(
            "/profile/00000000-0000-4000-8000-00000000000b"
        );
    });
});
