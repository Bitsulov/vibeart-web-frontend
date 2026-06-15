/**
 * @file Фикстуры сущности `comment` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import type {CommentType} from "../lib/types";
import {createComment} from "../model/createComment";
import {profileUserMock} from "entities/user";

export const commentsMock: CommentType[] = [
    createComment({author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.271Z"}),
    createComment({author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.272Z"}),
    createComment({author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.273Z"}),
    createComment({author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.274Z"}),
    createComment({author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.275Z"}),
];
