/**
 * @file Фикстуры сущности `message` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import type { MessageType } from "../lib/types";

export const messagesMock: MessageType[] = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        createdAt: "2024-01-15T14:23:00.000Z",
        isYour: false,
        status: "read"
    },
    {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
        createdAt: "2024-01-15T14:23:45.000Z",
        isYour: true,
        status: "read"
    },
    {
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur?",
        createdAt: "2024-01-15T14:31:00.000Z",
        isYour: false,
        status: "read"
    },
    {
        text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
        createdAt: "2024-01-15T17:10:00.000Z",
        isYour: true,
        status: "read"
    },
    {
        text: "Quis autem vel eum iure reprehenderit qui in ea voluptate?",
        createdAt: "2024-01-18T10:05:00.000Z",
        isYour: false,
        status: "read"
    },
    {
        text: "At vero eos et accusamus et iusto odio dignissimos ducimus.",
        createdAt: "2024-04-02T08:44:00.000Z",
        isYour: true,
        status: "sent"
    },
    {
        text: "Nam libero tempore cum soluta nobis est eligendi optio cumque.",
        createdAt: "2026-04-13T09:00:00.000Z",
        isYour: false,
        status: "sent"
    },
    {
        text: "Temporibus autem quibusdam et aut officiis debitis rerum.",
        createdAt: "2026-04-13T09:00:12.000Z",
        isYour: true,
        status: "save"
    }
];
