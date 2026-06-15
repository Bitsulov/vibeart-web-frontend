import type {Dispatch, SetStateAction} from "react";
import type {UseFormReset} from "react-hook-form";
import type {ICodeForm} from "../lib/types";

/**
 * Возвращает форму из режима ввода кода подтверждения обратно в режим регистрации.
 *
 * @param setIsEmailSent - Сеттер признака отправки письма с кодом.
 * @param codeReset - Функция сброса формы кода подтверждения {@link ICodeForm}.
 */
export function returnToRegisterHandler(
    setIsEmailSent: Dispatch<SetStateAction<boolean>>,
    codeReset: UseFormReset<ICodeForm>
) {
    setIsEmailSent(false);
    codeReset();
}
