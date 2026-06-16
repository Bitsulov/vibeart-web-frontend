import type { TFunction } from "i18next";
import { getLocalTimeNumbers } from "./getLocalTimeNumbers";

/**
 * Форматирует дату последнего сообщения для отображения в списке чатов.
 *
 * Логика форматирования:
 * - Если сообщение отправлено сегодня — возвращает время в формате `ЧЧ:ММ`.
 * - Если прошло менее одного месяца — возвращает количество дней
 *   (например, «2 дня назад»).
 * - Если прошло от одного месяца до одного года — возвращает количество
 *   месяцев (например, «3 месяца назад»).
 * - Если прошло более года — возвращает полную дату в числовом формате
 *   через {@link getLocalTimeNumbers}.
 *
 * @param t - Функция перевода из хука `useTranslation`.
 * @param language - Код языка по стандарту BCP 47 (например, `"ru"`, `"en"`).
 * @param date - Дата сообщения в виде объекта `Date` или строки ISO 8601.
 * @returns Отформатированная строка с датой или временем.
 *
 * @example
 * getChatDate(t, "ru", new Date()) // "14:32"
 * getChatDate(t, "ru", "2026-04-10T10:00:00.000Z") // "5 дней назад"
 * getChatDate(t, "ru", "2025-01-01T00:00:00.000Z") // "01.01.2025"
 */
export function getChatDate(t: TFunction, language: string, date: Date | string): string {
    const d = new Date(date);
    const now = new Date();

    const isToday =
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate();

    if (isToday) {
        return new Intl.DateTimeFormat(language, {
            hour: "2-digit",
            minute: "2-digit"
        }).format(d);
    }

    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    const diffMonths =
        (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());

    if (diffDays < 365) {
        if (diffMonths >= 1) {
            return t("monthsAgo", { count: diffMonths });
        }

        return t("daysAgo", { count: diffDays });
    }

    return getLocalTimeNumbers(language, d);
}
