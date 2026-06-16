import type { ChatType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта диалога.
 *
 * Устанавливает значение по умолчанию: текущую дату для `createdAt`.
 *
 * @param chat - Данные диалога, соответствующие типу `ChatType`.
 * @returns Нормализованный объект диалога.
 *
 * @example
 * const chat = createChat({ UUID: "01ARZ...", companion: profileUserMock,
 *   lastMessage: createMessage({ isYour: false, text: "Привет!" }),
 *   imageUrl: "" });
 * chat.UUID // "01ARZ..."
 */
export function createChat({
    UUID,
    companion,
    lastMessage,
    createdAt = new Date().toISOString(),
    imageUrl
}: ChatType) {
    return {
        UUID,
        companion,
        lastMessage,
        createdAt,
        imageUrl
    };
}
