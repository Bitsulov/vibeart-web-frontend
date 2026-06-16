import { describe, it, expect, vi } from "vitest";
import { confirmDeletePost } from "./confirmDeletePost";

describe("confirmDeletePost - навигация к профилю автора после удаления альбома", () => {
    it("Вызывает navigate с правильным URL профиля", () => {
        const navigate = vi.fn();
        const UUID = "00000000-0000-4000-8000-00000000000b";

        confirmDeletePost(navigate, UUID);

        expect(navigate).toHaveBeenCalledWith(`/profile/${UUID}`);
    });
});
