import type { AxiosResponse } from "axios";
import { setUserInfo, type VerifyRequest } from "entities/user";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";
import type { NavigateFunction } from "react-router-dom";
import type { AuthResponse } from "entities/user";
import { encryptToString } from "shared/lib/crypto";
import type { QueryClient } from "@tanstack/react-query";

/**
 * Обрабатывает успешную верификацию кода подтверждения: шифрует и сохраняет
 * полученные токены авторизации в куки-файлы, записывает данные
 * авторизованного пользователя в Redux, показывает уведомление об успешной
 * регистрации и перенаправляет на страницу профиля пользователя.
 *
 * @param response - Пара токенов авторизации и UUID пользователя, {@link AuthResponse}.
 * @param request - Адрес электронной почты, для которого выполнялась верификация, {@link VerifyRequest}.
 * @param dispatch - Функция записи данных в Redux.
 * @param queryClient - Клиент TanStack Query для сброса кеша после авторизации.
 * @param navigate - Функция навигации React Router.
 */
export async function verifySuccessHandler(
    response: AxiosResponse<AuthResponse>,
    request: VerifyRequest,
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
            message: "api.verifyAccess",
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
    queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate(`/profile/${response.data.uuid}`);
}
