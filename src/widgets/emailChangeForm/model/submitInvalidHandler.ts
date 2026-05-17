import type {FieldErrors} from "react-hook-form";
import type {IEmailChangeForm} from "../lib/types";
import type {Dispatch} from "@reduxjs/toolkit";
import {showToast} from "features/toast";

/**
 * Показывает уведомление с первой ошибкой валидации формы изменения адреса электронной почты.
 *
 * @param errors - Объект ошибок react-hook-form.
 * @param dispatch - Функция записи данных в Redux.
 */
export function submitInvalidHandler(
    errors: FieldErrors<IEmailChangeForm>,
    dispatch: Dispatch
) {
    const error = errors.oldEmail || errors.newEmail;

    if (error?.message) {
        dispatch(showToast({message: error.message, type: "error"}));
    }
}
