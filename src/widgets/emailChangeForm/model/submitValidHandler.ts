import type { UseFormSetValue } from "react-hook-form";
import type { IEmailChangeForm } from "../lib/types";
import type { Dispatch, SetStateAction } from "react";

/**
 * Обрабатывает успешную отправку формы изменения email: сохраняет новый адрес,
 * переводит форму в режим ввода кода подтверждения и сбрасывает поля.
 *
 * @param setValue - Сеттер значений полей формы.
 * @param setIsEmailSent - Переключает форму в шаг ввода кода.
 * @param setNewEmailResult - Сохраняет новый email для отображения в тексте подтверждения.
 * @param newEmailValue - Новый email, введённый пользователем.
 */
export function submitValidHandler(
    setValue: UseFormSetValue<IEmailChangeForm>,
    setIsEmailSent: Dispatch<SetStateAction<boolean>>,
    setNewEmailResult: Dispatch<SetStateAction<string>>,
    newEmailValue: string
) {
    setIsEmailSent(true);
    setNewEmailResult(newEmailValue);
    setValue("oldEmail", "");
    setValue("newEmail", "");
}
