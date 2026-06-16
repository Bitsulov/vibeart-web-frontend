import type { Dispatch, KeyboardEvent, RefObject, SetStateAction } from "react";

/**
 * Обрабатывает нажатие Backspace: очищает текущую ячейку и переводит фокус на предыдущую.
 *
 * @param e - Событие нажатия клавиши.
 * @param ref - Ref-массив всех ячеек кода.
 * @param currentRef - Индекс текущей ячейки.
 * @param setValue - Сеттер значения текущей ячейки.
 */
export function keyDownHandler(
    e: KeyboardEvent,
    ref: RefObject<(HTMLInputElement | null)[]>,
    currentRef: number,
    setValue: Dispatch<SetStateAction<string>>
) {
    if (e.key === "Backspace") {
        e.preventDefault();
        setValue("");
        ref.current[currentRef - 1]?.focus();
    }
}
