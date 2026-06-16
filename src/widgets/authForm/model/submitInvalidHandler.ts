import type { IAuthForm } from "../lib/types";
import type { FieldErrors } from "react-hook-form";

/**
 * Обрабатывает неуспешную отправку формы авторизации.
 *
 * @param data - Объект ошибок валидации полей формы.
 */
export function submitInvalidHandler(data: FieldErrors<IAuthForm>) {
    console.log("Invalid form submit ", data);
}
