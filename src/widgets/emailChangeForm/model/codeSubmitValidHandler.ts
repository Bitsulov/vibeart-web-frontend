import type {ICodeForm, IEmailChangeForm} from "../lib/types";
import type {Dispatch} from "@reduxjs/toolkit";
import {showToast} from "features/toast";
import React, {type SetStateAction} from "react";
import type {UseFormReset} from "react-hook-form";

/**
 * Обрабатывает отправку кода подтверждения смены email:
 * проверяет длину кода, показывает ошибку или завершает процесс.
 *
 * @param data - Данные формы ввода кода.
 * @param dispatch - Функция записи данных в Redux.
 * @param setErrorCode - Переключает режим отображения ошибки в полях кода.
 * @param setIsEmailSent - Возвращает форму к шагу ввода email.
 * @param resetEmailForm - Сбрасывает форму изменения email.
 */
export function codeSubmitValidHandler(
    data: ICodeForm,
    dispatch: Dispatch,
    setErrorCode: React.Dispatch<SetStateAction<boolean>>,
    setIsEmailSent: React.Dispatch<SetStateAction<boolean>>,
    resetEmailForm: UseFormReset<IEmailChangeForm>
) {
    if(data.code.length !== 6) {
        dispatch(showToast({message: "toast.wrongCodeLength", type: "error"}));
        setErrorCode(true);
        return
    }

    setErrorCode(false);
    setTimeout(() => {
        resetEmailForm();
    }, 0);
    setIsEmailSent(false);
}
