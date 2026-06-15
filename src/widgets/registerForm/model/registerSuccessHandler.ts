import type {AxiosResponse} from "axios";
import type {SignUpRequest} from "entities/user";
import type {Dispatch} from "@reduxjs/toolkit";
import {showToast} from "features/toast";
import React, {type SetStateAction} from "react";
import type {UseFormSetValue} from "react-hook-form";
import type {IRegisterForm} from "../lib/types";
import type {QueryClient} from "@tanstack/react-query";

/**
 * Обрабатывает успешную регистрацию: показывает уведомление о том,
 * что код подтверждения отправлен на почту, очищает форму регистрации
 * и переключает форму в режим ввода кода подтверждения.
 *
 * @param _response - Ответ сервера (не используется).
 * @param request - Данные регистрации, {@link SignUpRequest}.
 * @param dispatch - Функция записи данных в Redux.
 * @param setIsEmailSent - Сеттер признака отправки письма с кодом.
 * @param setValue - Функция react-hook-form для сброса значений полей {@link IRegisterForm}.
 * @param queryClient - Клиент TanStack Query, используемый для пометки связанных запросов как устаревших.
 * @param setSentEmail - Сеттер адреса электронной почты, на который отправлен код.
 */
export function registerSuccessHandler(
    _response: AxiosResponse<string>,
    request: SignUpRequest,
    dispatch: Dispatch,
    setIsEmailSent: React.Dispatch<SetStateAction<boolean>>,
    setValue: UseFormSetValue<IRegisterForm>,
    queryClient: QueryClient,
    setSentEmail: React.Dispatch<SetStateAction<string>>
) {
    dispatch(showToast({
        message: "api.registerAccess",
        type: "success",
        params: {email: request.email}
    }));
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    setValue("agreed", false);
    setValue("agreed2", false);
    queryClient.invalidateQueries({queryKey: ["register"]});
    setIsEmailSent(true);
    setSentEmail(request.email);
}
