import type { AxiosResponse } from "axios";
import { type AuthResponse, setUserInfo } from "entities/user";
import type { QueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router-dom";
import { encryptToString } from "shared/lib/crypto";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";
import type { IAuthForm } from "../lib/types";
import type { UseFormSetValue } from "react-hook-form";

/**
 * Обрабатывает успешный вход: шифрует и сохраняет полученные токены
 * в куки-файлы, записывает данные авторизованного пользователя в хранилище,
 * очищает поля формы, сбрасывает кеш и перенаправляет в галерею.
 *
 * @param response - Ответ сервера с токенами и UUID: {@link AuthResponse}.
 * @param request - Данные формы с адресом почты и паролем.
 * @param setValue - Функция сброса значений полей формы {@link IAuthForm}.
 * @param dispatch - Функция записи данных в Redux.
 * @param queryClient - Клиент TanStack Query для сброса кеша.
 * @param navigate - Функция навигации React Router.
 */
export async function loginSuccessHandler(
    response: AxiosResponse<AuthResponse>,
    request: IAuthForm,
    setValue: UseFormSetValue<IAuthForm>,
    dispatch: Dispatch,
    queryClient: QueryClient,
    navigate: NavigateFunction
) {
    const data = response.data;

    const encryptedAccessToken = await encryptToString(
        response.data.accessToken,
        import.meta.env.VITE_CRYPTO_KEY
    );
    const encryptedRefreshToken = await encryptToString(
        response.data.refreshToken,
        import.meta.env.VITE_CRYPTO_KEY
    );
    const accessTokenExpiresIn = response.data.accessTokenExpiresIn;
    const refreshTokenExpiresIn = response.data.refreshTokenExpiresIn;
    const now = Date.now();
    const accessTokenExpiresAt = now + accessTokenExpiresIn;
    const refreshTokenExpiresAt = now + refreshTokenExpiresIn;

    document.cookie = `accessToken=${encryptedAccessToken}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; Secure; path=/`;
    document.cookie = `accessTokenExpiresAt=${accessTokenExpiresAt}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; Secure; path=/`;
    document.cookie = `refreshToken=${encryptedRefreshToken}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; Secure; path=/`;
    document.cookie = `refreshTokenExpiresAt=${refreshTokenExpiresAt}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; Secure; path=/`;

    dispatch(
        showToast({
            message: "api.loginAccess",
            type: "success"
        })
    );
    dispatch(
        setUserInfo({
            UUID: data.uuid,
            email: request.email,
            isAuthenticated: true,
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
            accessTokenExpiresIn: response.data.accessTokenExpiresIn,
            refreshTokenExpiresIn: response.data.refreshTokenExpiresIn
        })
    );

    setValue("email", "");
    setValue("password", "");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/gallery");
}
