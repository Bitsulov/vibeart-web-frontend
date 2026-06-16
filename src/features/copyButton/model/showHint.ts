import type { Dispatch } from "@reduxjs/toolkit";
import { setText } from "features/mouseHint";

/**
 * Показывает подсказку мыши с переданным текстом.
 *
 * @param dispatch - Функция записи данных в Redux.
 * @param text - Текст подсказки.
 */
export function showHint(dispatch: Dispatch, text: string) {
    dispatch(setText(text));
}
