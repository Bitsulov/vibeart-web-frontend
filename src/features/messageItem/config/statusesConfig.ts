import {Check, CheckCheck, Clock, type LucideIcon} from "lucide-react";
import type {MessageType} from "entities/message";

/**
 * Соответствие статуса доставки сообщения иконке из библиотеки Lucide.
 *
 * - `"save"` — сообщение поставлено в очередь (иконка часов).
 * - `"sent"` — доставлено на сервер (одна галочка).
 * - `"read"` — прочитано получателем (двойная галочка).
 */
export const statusesConfig: Record<MessageType["status"], LucideIcon> = {
    "save": Clock,
    "sent": Check,
    "read": CheckCheck
}
