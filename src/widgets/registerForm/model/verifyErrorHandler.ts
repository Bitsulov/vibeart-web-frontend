import type {AxiosError} from "axios";
import type {AppError} from "shared/lib/types";
import {showToast} from "features/toast";
import type {Dispatch} from "@reduxjs/toolkit";

/**
 * Обрабатывает ошибку верификации кода подтверждения:
 * показывает уведомление с описанием ошибки в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка axios с телом ответа {@link AppError}.
 * @param dispatch - Функция записи данных в Redux.
 */
export function verifyErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 409:
            dispatch(showToast({
                message: "api.conflictVerifyUser",
                type: "error",
            }));
            break;
        case 404:
            dispatch(showToast({
                message: "api.userNotFound",
                type: "error",
            }));
            break;
        case 410:
            dispatch(showToast({
                message: "api.codeExpired",
                type: "error",
            }));
            break;
        case 400:
            dispatch(showToast({
                message: "api.invalidCode",
                type: "error",
            }));
            break;
        case 403:
            dispatch(showToast({
                message: "api.forbiddenError",
                type: "error",
            }));
            break;
        case 500:
            dispatch(showToast({
                message: "api.serverError",
                type: "error",
            }));
            break;
        default:
            dispatch(showToast({
                message: "api.unknownError",
                type: "error",
            }));
    }
}
