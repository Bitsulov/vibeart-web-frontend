import type {IAuthForm} from "../lib/types";
import type {UseFormSetValue} from "react-hook-form";

/**
 * Обрабатывает успешную отправку формы авторизации и сбрасывает поля.
 *
 * @param data - Данные формы с e-mail и паролем.
 * @param setValue - Функция сброса полей формы (react-hook-form).
 */
export function submitValidHandler(data: IAuthForm, setValue: UseFormSetValue<IAuthForm>) {
    console.log("Valid form submit ", data);
    setValue("email", "");
    setValue("password", "")
}
