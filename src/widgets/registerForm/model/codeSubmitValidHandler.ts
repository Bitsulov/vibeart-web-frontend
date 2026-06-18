import type { ICodeForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import React, { type SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import { showToast } from "features/toast";
import type { IRegisterForm } from "../lib/types";
import type { AuthResponse, VerifyRequest } from "entities/user";
import type { AxiosResponse } from "axios";

type SubmitFn = (data: VerifyRequest) => Promise<AxiosResponse<AuthResponse>>;

/**
 * Обрабатывает отправку формы с кодом подтверждения адреса электронной почты.
 *
 * Проверяет, что код состоит из 6 цифр: при ошибке показывает
 * уведомление и подсвечивает поле как невалидное. При успешной
 * проверке сбрасывает форму регистрации и отправляет код на сервер
 * для верификации.
 *
 * @param data - Данные формы кода: {@link ICodeForm}.
 * @param dispatch - Функция записи данных в Redux.
 * @param setErrorCode - Сеттер признака ошибки в поле кода.
 * @param setIsEmailSent - Сеттер признака отправки письма с кодом.
 * @param resetEmailForm - Функция сброса формы регистрации.
 * @param sentEmail - Адрес электронной почты, на который был отправлен код.
 * @param submit - Функция отправки кода подтверждения на сервер.
 */
export async function codeSubmitValidHandler(
    data: ICodeForm,
    dispatch: Dispatch,
    setErrorCode: React.Dispatch<SetStateAction<boolean>>,
    setIsEmailSent: React.Dispatch<SetStateAction<boolean>>,
    resetEmailForm: UseFormReset<IRegisterForm>,
    sentEmail: string,
    submit: SubmitFn
) {
    if (data.code.length !== 6) {
        dispatch(showToast({ message: "toast.wrongCodeLength", type: "error" }));
        setErrorCode(true);
        return;
    }

    setErrorCode(false);
    setTimeout(() => {
        resetEmailForm();
    }, 0);
    setIsEmailSent(false);
    await submit({ email: sentEmail, verificationCode: data.code });
}
