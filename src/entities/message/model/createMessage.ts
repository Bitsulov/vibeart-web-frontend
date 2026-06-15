import type {MessageType} from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта сообщения.
 *
 * Устанавливает значения по умолчанию: пустую строку
 * для `text`, `"save"` для `status`, `false` для `isNew`.
 *
 * @param message - Данные сообщения, соответствующие типу `MessageType`.
 * @returns Нормализованный объект сообщения.
 *
 * @example
 * const msg = createMessage({ isYour: true, text: "Привет!" });
 * msg.status // "save"
 * msg.isNew  // false
 */
export function createMessage({
    text = "",
    createdAt = new Date().toISOString(),
    isYour,
    isNew = false,
    status = "save"
}: MessageType) {
    return {
        text,
        createdAt,
        isYour,
        isNew,
        status,
    }
}
