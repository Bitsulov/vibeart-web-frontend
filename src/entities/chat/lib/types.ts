import type {UserType} from "entities/user";
import type {MessageType} from "entities/message";

/**
 * Описывает личный диалог между двумя пользователями сайта.
 */
export interface ChatType {
    /** Внутренний числовой идентификатор в базе данных. */
    id: number;
    /** ULID, используемый в публичных URL (например, `/chat/:ulid`). */
    ULID: string;
    /** Полный профиль собеседника в данном диалоге. */
    companion: UserType;
    /** Последнее сообщение в диалоге, отображаемое в превью списка чатов. */
    lastMessage: MessageType;
    /** Дата и время создания диалога в формате ISO 8601. */
    createdAt: string;
    /** URL изображения-обложки диалога (как правило, аватар собеседника). */
    imageUrl: string;
}
