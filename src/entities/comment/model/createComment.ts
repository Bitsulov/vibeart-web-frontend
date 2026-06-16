import type { CommentType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта комментария.
 *
 * Устанавливает значения по умолчанию: пустую строку
 * для `text`, текущую дату для `createdAt`.
 *
 * @param comment - Данные комментария, соответствующие типу `CommentType`.
 * @returns Нормализованный объект комментария.
 *
 * @example
 * const comment = createComment({ author: profileUserMock,
 *   text: "Отличная работа!" });
 * comment.text // "Отличная работа!"
 */
export function createComment({
    text = "",
    author,
    createdAt = new Date().toISOString()
}: CommentType) {
    return {
        text,
        author,
        createdAt
    };
}
