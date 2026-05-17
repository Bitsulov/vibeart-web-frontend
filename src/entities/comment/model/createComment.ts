import type {CommentType} from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта комментария.
 *
 * Устанавливает значения по умолчанию: `0` для `id`, пустую строку
 * для `text`, текущую дату для `createdAt`.
 *
 * @param comment - Данные комментария, соответствующие типу `CommentType`.
 * @returns Нормализованный объект комментария.
 *
 * @example
 * const comment = createComment({ author: profileUserMock,
 *   text: "Отличная работа!" });
 * comment.id // 0
 */
export function createComment({
    id = 0,
    text = "",
    author,
    createdAt = new Date().toISOString()
}: CommentType) {
    return {
        id,
        text,
        author,
        createdAt
    }
}
