import type { IPasswordChangeForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import type { FieldErrors } from "react-hook-form";
import { showToast } from "features/toast";

/**
 * Показывает уведомление с первой ошибкой валидации формы смены пароля.
 *
 * @param errors - Объект ошибок react-hook-form.
 * @param dispatch - Функция записи данных в Redux.
 */
export function submitInvalidHandler(
    errors: FieldErrors<IPasswordChangeForm>,
    dispatch: Dispatch
) {
    const error = errors.oldPassword || errors.newPassword || errors.confirmNewPassword;

    if (error?.message) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
}
