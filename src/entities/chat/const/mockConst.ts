/**
 * @file Фикстуры сущности `chat` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import { createChat } from "../model/createChat";
import { createMessage } from "entities/message";
import { principalUserMock, profileUserMock } from "entities/user";

export const chatsMock = [
    createChat({
        UUID: "00000000-0000-4000-8000-000000000001",
        companion: profileUserMock,
        lastMessage: createMessage({
            text: "Привет! Как дела?",
            createdAt: "2024-04-10T10:30:00.000Z",
            isYour: false,
            status: "read"
        }),
        createdAt: "2026-04-01T09:00:00.000Z",
        imageUrl: ""
    }),
    createChat({
        UUID: "00000000-0000-4000-8000-000000000002",
        companion: principalUserMock,
        lastMessage: createMessage({
            text: "Посмотри мою новую работу, буду рад отзыву!",
            createdAt: "2026-04-11T12:15:00.000Z",
            isYour: true,
            status: "sent"
        }),
        createdAt: "2026-04-02T11:00:00.000Z",
        imageUrl: ""
    }),
    createChat({
        UUID: "00000000-0000-4000-8000-000000000003",
        companion: profileUserMock,
        lastMessage: createMessage({
            text: "Спасибо за вдохновение!",
            createdAt: "2026-01-09T18:45:00.000Z",
            isYour: false,
            status: "read"
        }),
        createdAt: "2026-04-03T14:00:00.000Z",
        imageUrl: ""
    }),
    createChat({
        UUID: "00000000-0000-4000-8000-000000000004",
        companion: principalUserMock,
        lastMessage: createMessage({
            text: "Когда планируешь выложить следующий пост?",
            createdAt: "2026-04-08T20:00:00.000Z",
            isYour: false,
            status: "read"
        }),
        createdAt: "2026-04-04T16:30:00.000Z",
        imageUrl: ""
    }),
    createChat({
        UUID: "00000000-0000-4000-8000-000000000005",
        companion: profileUserMock,
        lastMessage: createMessage({
            text: "Отличная работа, продолжай в том же духе!",
            createdAt: "2026-04-07T09:20:00.000Z",
            isYour: true,
            status: "save"
        }),
        createdAt: "2026-04-05T08:00:00.000Z",
        imageUrl: ""
    })
];
