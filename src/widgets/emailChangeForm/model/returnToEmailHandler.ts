import type { Dispatch, SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import type { ICodeForm, IEmailChangeForm } from "../lib/types";

/**
 * Возвращает форму к шагу ввода email и сбрасывает обе формы.
 *
 * @param setIsEmailSent - Переключает форму обратно к шагу ввода email.
 * @param reset - Сброс формы изменения email.
 * @param codeReset - Сброс формы ввода кода подтверждения.
 */
export function returnToEmailHandler(
    setIsEmailSent: Dispatch<SetStateAction<boolean>>,
    reset: UseFormReset<IEmailChangeForm>,
    codeReset: UseFormReset<ICodeForm>
) {
    setIsEmailSent(false);
    reset();
    codeReset();
}
