/**
 * Форматирует дату в числовом формате с учётом локали
 * (например, `"15.01.2025"` для `"ru"` или `"01/15/2025"` для `"en"`).
 *
 * @param language - Код языка по стандарту BCP 47 (например, `"ru"`, `"en"`).
 * @param date - Дата для форматирования (объект `Date` или строка ISO 8601).
 * @returns Строка с датой в числовом формате, соответствующем локали.
 *
 * @example
 * getLocalTimeNumbers("ru", "2025-01-15T00:00:00.000Z") // "15.01.2025"
 * getLocalTimeNumbers("en", "2025-01-15T00:00:00.000Z") // "1/15/2025"
 */
export function getLocalTimeNumbers(language: string, date: Date | string) {
    return new Intl.DateTimeFormat(language, {
        day: "numeric",
        month: "2-digit",
        year: "numeric"
    }).format(new Date(date));
}
