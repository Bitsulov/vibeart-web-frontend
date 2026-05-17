/**
 * Вычисляет диапазон номеров страниц для компонента пагинации.
 *
 * Диапазон всегда остаётся в границах `[1, total]`. Если окно
 * выходит за левый или правый край, оно сдвигается так, чтобы
 * отображать максимально возможное число страниц.
 *
 * @param current - Номер текущей страницы (начиная с 1).
 * @param total - Общее количество страниц.
 * @param delta - Количество страниц, отображаемых слева и справа
 *   от текущей. По умолчанию `2`.
 * @returns Объект с полями `start` и `end` — включительные границы
 *   диапазона страниц для отображения.
 *
 * @example
 * getRangeNumbers(5, 10)    // { start: 3, end: 7 }
 * getRangeNumbers(1, 10)    // { start: 1, end: 5 }
 * getRangeNumbers(10, 10)   // { start: 6, end: 10 }
 */
export function getRangeNumbers(current: number, total: number, delta: number = 2) {
    let start = current - delta;
    let end = current + delta;

    if (start < 1) {
        start = 1;
        end = Math.min(delta * 2 + 1, total);
    }

    if (end > total) {
        end = total;
        start = Math.max(total - delta * 2, 1);
    }

    return { start, end };
}
