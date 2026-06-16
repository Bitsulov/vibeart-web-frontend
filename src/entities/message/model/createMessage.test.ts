import { describe, expect, it } from "vitest";
import { createMessage } from "./createMessage";

describe("createMessage - Возвращает объект типа MessageType", () => {
    it("Создание экземпляра сообщения", () => {
        expect(
            createMessage({
                text: "",
                createdAt: "2026-03-29T17:25:15.940Z",
                isYour: false,
                status: "sent"
            })
        ).toEqual({
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z",
            isYour: false,
            isNew: false,
            status: "sent"
        });
    });
    it("Создание экземпляра сообщения с неполными данными", () => {
        expect(
            // @ts-expect-error неполная информация
            createMessage({
                createdAt: "2026-03-29T17:25:15.940Z",
                isYour: false
            })
        ).toEqual({
            text: "",
            createdAt: "2026-03-29T17:25:15.940Z",
            isYour: false,
            isNew: false,
            status: "save"
        });
    });
});
