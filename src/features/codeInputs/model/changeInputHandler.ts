import type {ChangeEvent, RefObject} from "react";

/**
 * Переводит фокус на следующую ячейку после ввода символа.
 *
 * @param e - Событие изменения input.
 * @param ref - Ref-массив всех ячеек кода.
 * @param currentRef - Индекс текущей ячейки.
 */
export function changeInputHandler(e: ChangeEvent<HTMLInputElement>, ref: RefObject<(HTMLInputElement | null)[]>, currentRef: number) {
    if(e.target) {
        ref.current[currentRef + 1]?.focus();
    }
}
