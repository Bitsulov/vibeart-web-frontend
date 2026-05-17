/**
 * Форматирует дату в полном текстовом формате с учётом локали
 * (например, `"15 января 2025 г."` для `"ru"`).
 *
 * @param language - Код языка по стандарту BCP 47 (например, `"ru"`, `"en"`).
 * @param date - Дата для форматирования (объект `Date` или строка ISO 8601).
 * @returns Локализованная строка даты с полным названием месяца.
 *
 * @example
 * getLocalTimeString("ru", "2025-01-15T00:00:00.000Z") // "15 января 2025 г."
 * getLocalTimeString("en", "2025-01-15T00:00:00.000Z") // "January 15, 2025"
 */
export function getLocalTimeString(language: string, date: Date | string) {
    return new Intl.DateTimeFormat(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
}
