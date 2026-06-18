import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";

/**
 * Обрабатывает ошибку авторизации: показывает уведомление в зависимости
 * от кода ответа сервера.
 *
 * @param error - Ошибка с телом ответа {@link AppError}.
 * @param dispatch - Функция записи данных в Redux.
 */
export function loginErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 401:
            dispatch(
                showToast({
                    message: "api.invalidEmailPassword",
                    type: "error"
                })
            );
            break;
        case 404:
            dispatch(
                showToast({
                    message: "api.userNotFound",
                    type: "error"
                })
            );
            break;
        case 403:
            dispatch(
                showToast({
                    message: "api.forbiddenError",
                    type: "error"
                })
            );
            break;
        case 500:
            dispatch(
                showToast({
                    message: "api.serverError",
                    type: "error"
                })
            );
            break;
        default:
            dispatch(
                showToast({
                    message: "api.unknownError",
                    type: "error"
                })
            );
    }
}
