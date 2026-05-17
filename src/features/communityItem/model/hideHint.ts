import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

/**
 * Скрывает подсказку, сбрасывая её текст.
 * @param dispatch - Функция записи данных в Redux.
 */
export function hideHint(dispatch: Dispatch) {
    dispatch(setText(""));
}
