import type {TagType} from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта тега.
 *
 * Устанавливает значения по умолчанию: `0` для `id`, пустые строки
 * для `title` и `createdAt`.
 *
 * @param tag - Данные тега, соответствующие типу `TagType`.
 * @returns Нормализованный объект тега.
 *
 * @example
 * const tag = createTag({ id: 1, title: "природа" });
 * tag.createdAt // текущая дата в ISO 8601
 */
export function createTag({
    id = 0,
    title = '',
    createdAt = new Date().toISOString()
}: TagType) {
    return {
        id,
        title,
        createdAt
    }
}
