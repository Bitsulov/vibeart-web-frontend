import type {FieldErrors} from "react-hook-form";
import type {ICreateAlbumForm} from "../lib/types";
import type {Dispatch} from "@reduxjs/toolkit";
import {showToast} from "features/toast";

/**
 * Показывает уведомление с первой ошибкой валидации формы создания альбома.
 *
 * @param errors - Объект ошибок react-hook-form.
 * @param dispatch - Redux dispatch.
 */
export function submitInvalidHandler(
    errors: FieldErrors<ICreateAlbumForm>,
    dispatch: Dispatch
) {
    const error = errors.title || errors.description || errors.img;

    if (error?.message) {
        dispatch(showToast({message: error.message, type: "error"}));
    }
}
