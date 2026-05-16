import type {UseFormSetValue} from "react-hook-form";
import type {IPasswordChangeForm} from "../lib/types";
import type {Dispatch, SetStateAction} from "react";

/**
 * Обрабатывает успешную отправку формы изменения пароля: сохраняет новый пароль,
 * переводит форму в режим ввода кода подтверждения и сбрасывает поля.
 *
 * @param setValue - Сеттер значений полей формы.
 * @param setIsPasswordSent - Переключает форму в шаг ввода кода.
 * @param setNewPasswordResult - Сохраняет новый пароль (для внутреннего использования).
 * @param newPasswordValue - Новый пароль, введённый пользователем.
 */
export function submitValidHandler(
    setValue: UseFormSetValue<IPasswordChangeForm>,
    setIsPasswordSent: Dispatch<SetStateAction<boolean>>,
    setNewPasswordResult: Dispatch<SetStateAction<string>>,
    newPasswordValue: string
) {
    setNewPasswordResult(newPasswordValue);
    setIsPasswordSent(true);
    setValue("oldPassword", "");
    setValue("newPassword", "");
    setValue("confirmNewPassword", "");
}
