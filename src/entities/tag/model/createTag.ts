import type { TagType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта тега.
 *
 * Устанавливает значения по умолчанию: пустые строки
 * для `title` и `createdAt`.
 *
 * @param tag - Данные тега, соответствующие типу `TagType`.
 * @returns Нормализованный объект тега.
 *
 * @example
 * const tag = createTag({ title: "природа" });
 * tag.createdAt // текущая дата в ISO 8601
 */
export function createTag({ title = "", createdAt = new Date().toISOString() }: TagType) {
    return {
        title,
        createdAt
    };
}
