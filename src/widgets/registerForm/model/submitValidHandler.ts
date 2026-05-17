import type {IRegisterForm} from "../lib/types";
import type {UseFormSetValue} from "react-hook-form";

/**
 * Обрабатывает успешную отправку формы регистрации и сбрасывает все поля.
 *
 * @param data - Данные формы с e-mail, паролем и подтверждением согласий.
 * @param setValue - Функция сброса полей формы (react-hook-form).
 */
export function submitValidHandler(data: IRegisterForm, setValue: UseFormSetValue<IRegisterForm>) {
    console.log("Valid form submit ", data);
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    setValue("agreed", false);
    setValue("agreed2", false);
}
