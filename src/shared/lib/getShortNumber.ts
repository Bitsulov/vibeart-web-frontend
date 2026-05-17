/**
 * Форматирует число в компактную нотацию на английском языке
 * (например, `1500` → `"1.5K"`, `1 200 000` → `"1.2M"`).
 *
 * Используется для отображения счётчиков лайков, подписчиков и прочих
 * больших чисел в ограниченном пространстве интерфейса.
 *
 * @param number - Число для форматирования.
 * @param fractionDigits - Максимальное количество знаков после запятой
 *   в компактной записи. По умолчанию `1`.
 * @returns Строка в компактной нотации.
 *
 * @example
 * getShortNumber(1500)        // "1.5K"
 * getShortNumber(1200000)     // "1.2M"
 * getShortNumber(999, 0)      // "999"
 */
export function getShortNumber(number: number, fractionDigits = 1) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: fractionDigits
    }).format(number);
}
