import {describe, it, expect, vi} from "vitest";
import {postChooseHandler} from "./postChooseHandler";

const UUID = "00000000-0000-4000-8000-000000000007";
const OTHER_UUID = "00000000-0000-4000-8000-000000000006";

describe("postChooseHandler - переключает выбор поста в модальном окне", () => {
    it("Добавляет UUID в список, если пост не выбран", () => {
        const setSelectedPosts = vi.fn();

        postChooseHandler(false, UUID, setSelectedPosts);

        const updater = setSelectedPosts.mock.calls[0][0];
        expect(updater([])).toContain(UUID);
    });

    it("Удаляет UUID из списка, если пост уже выбран", () => {
        const setSelectedPosts = vi.fn();

        postChooseHandler(true, UUID, setSelectedPosts);

        const updater = setSelectedPosts.mock.calls[0][0];
        const result = updater([OTHER_UUID, UUID]);
        expect(result).not.toContain(UUID);
        expect(result).toContain(OTHER_UUID);
    });

    it("Не затрагивает другие посты при добавлении", () => {
        const setSelectedPosts = vi.fn();

        postChooseHandler(false, UUID, setSelectedPosts);

        const updater = setSelectedPosts.mock.calls[0][0];
        const result = updater([OTHER_UUID]);
        expect(result).toEqual([OTHER_UUID, UUID]);
    });
});
