import type {ChatType} from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта диалога.
 *
 * Устанавливает значения по умолчанию: `0` для `id`, текущую дату
 * для `createdAt`.
 *
 * @param chat - Данные диалога, соответствующие типу `ChatType`.
 * @returns Нормализованный объект диалога.
 *
 * @example
 * const chat = createChat({ ULID: "01ARZ...", companion: profileUserMock,
 *   lastMessage: createMessage({ isYour: false, text: "Привет!" }),
 *   imageUrl: "" });
 * chat.id // 0
 */
export function createChat({
    id = 0,
    ULID,
    companion,
    lastMessage,
    createdAt = new Date().toISOString(),
    imageUrl,
}: ChatType) {
    return {
        id,
        ULID,
        companion,
        lastMessage,
        createdAt,
        imageUrl,
    }
}
