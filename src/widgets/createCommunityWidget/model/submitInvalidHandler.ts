import type { FieldErrors } from "react-hook-form";
import type { ICreateCommunityForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Показывает уведомление с первой ошибкой валидации формы создания сообщества.
 *
 * @param errors - Объект ошибок react-hook-form.
 * @param dispatch - Функция записи данных в Redux.
 */
export function submitInvalidHandler(
    errors: FieldErrors<ICreateCommunityForm>,
    dispatch: Dispatch
) {
    const error = errors.title || errors.description || errors.avatar || errors.id;

    if (error?.message) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
}
