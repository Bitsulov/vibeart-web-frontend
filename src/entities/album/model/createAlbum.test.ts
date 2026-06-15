import {describe, expect, it} from "vitest";
import {createAlbum} from "./createAlbum";

describe("createAlbum - Возвращает объект типа AlbumType", () => {
    it("Создание экземпляра альбома", () => {
        expect(createAlbum({
            name: "Альбом",
            UUID: "gfjhfhgfhgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            description: "",
            postCount: 0,
            postsList: [],
        })).toEqual({
            name: "Альбом",
            UUID: "gfjhfhgfhgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            description: "",
            postCount: 0,
            postsList: [],
        });
    });
    it("Создание экземпляра альбома с неполными данными", () => {
        // @ts-expect-error неполная информация
        expect(createAlbum({
            UUID: "gfjhfhgfhgf",
            imageUrl: "",
            createdAt: "2026-03-29T17:25:15.940Z"
        })).toEqual({
            name: "",
            UUID: "gfjhfhgfhgf",
            createdAt: "2026-03-29T17:25:15.940Z",
            imageUrl: "",
            description: "",
            postCount: 0,
            postsList: [],
        });
    });
});
