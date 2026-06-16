import type { FieldErrors } from "react-hook-form";
import type { IContactsForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Показывает уведомление с первой ошибкой валидации формы связи с администрацией.
 *
 * Проверяет поле `text` и выводит сообщение об ошибке.
 * Если сообщение пустое или ошибок нет — ничего не делает.
 *
 * @param errors - Объект ошибок react-hook-form для полей {@link IContactsForm}.
 * @param dispatch - Функция записи данных в Redux.
 */
export function submitInvalidHandler(
    errors: FieldErrors<IContactsForm>,
    dispatch: Dispatch
) {
    const error = errors.text;

    if (error?.message) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
}
