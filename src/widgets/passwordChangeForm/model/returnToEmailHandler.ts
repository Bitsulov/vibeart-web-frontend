import type { Dispatch, SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import type { IPasswordChangeForm, ICodeForm } from "../lib/types";

/**
 * Возвращает форму к шагу ввода пароля и сбрасывает обе формы.
 *
 * @param setIsEmailSent - Переключает форму обратно к шагу ввода пароля.
 * @param reset - Сброс формы изменения пароля.
 * @param codeReset - Сброс формы ввода кода подтверждения.
 */
export function returnToEmailHandler(
    setIsEmailSent: Dispatch<SetStateAction<boolean>>,
    reset: UseFormReset<IPasswordChangeForm>,
    codeReset: UseFormReset<ICodeForm>
) {
    setIsEmailSent(false);
    reset();
    codeReset();
}
