import { describe, it, expect, vi } from "vitest";
import type { ChangeEvent } from "react";
import { onChangeAvatarLoadHandler } from "./onChangeAvatarLoadHandler";

describe("onChangeAvatarLoadHandler - обработчик загрузки аватара", () => {
    it("Устанавливает avatarUrl и вызывает setLoadedFile при выборе файла", () => {
        vi.stubGlobal("URL", { ...URL, createObjectURL: vi.fn(() => "blob:mock-url") });

        const setEntityInfo = vi.fn();
        const setLoadedFile = vi.fn();
        const file = new File(["content"], "avatar.png", { type: "image/png" });
        const event = {
            target: { files: [file] }
        } as unknown as ChangeEvent<HTMLInputElement>;

        const result = onChangeAvatarLoadHandler(event, setEntityInfo, setLoadedFile);

        expect(setLoadedFile).toHaveBeenCalledWith(file);
        expect(setEntityInfo).toHaveBeenCalled();
        expect(result).toBe(file);

        const updater = setEntityInfo.mock.calls[0][0];
        expect(updater({ name: "test" })).toEqual({
            name: "test",
            avatarUrl: "blob:mock-url"
        });
    });

    it("Устанавливает указанное поле если передан fieldName", () => {
        vi.stubGlobal("URL", { ...URL, createObjectURL: vi.fn(() => "blob:mock-url") });

        const setEntityInfo = vi.fn();
        const file = new File(["content"], "cover.png", { type: "image/png" });
        const event = {
            target: { files: [file] }
        } as unknown as ChangeEvent<HTMLInputElement>;

        onChangeAvatarLoadHandler(event, setEntityInfo, undefined, "imageUrl");

        const updater = setEntityInfo.mock.calls[0][0];
        expect(updater({ title: "test" })).toEqual({
            title: "test",
            imageUrl: "blob:mock-url"
        });
    });

    it("Возвращает null и не вызывает сеттеры если файл не выбран", () => {
        const setEntityInfo = vi.fn();
        const setLoadedFile = vi.fn();
        const event = {
            target: { files: [] }
        } as unknown as ChangeEvent<HTMLInputElement>;

        const result = onChangeAvatarLoadHandler(event, setEntityInfo, setLoadedFile);

        expect(result).toBeNull();
        expect(setEntityInfo).not.toHaveBeenCalled();
        expect(setLoadedFile).not.toHaveBeenCalled();
    });
});
