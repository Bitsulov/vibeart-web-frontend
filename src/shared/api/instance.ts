import axios, {type InternalAxiosRequestConfig} from "axios";
import {decryptFromString, encryptToString} from "../lib/crypto";
import {getCookieByName} from "../lib/getCookieByName";
import {clearCookiesTokens} from "../lib/clearCookiesTokens";
import {refreshIgnoreEndpoints} from "../const/const";
import {store} from "app/store";
import {showToast} from "features/toast";

const API_BASE: string = import.meta.env.VITE_API_BASE;

/**
 * Общий экземпляр axios для запросов к API.
 *
 * Использует базовый URL из переменной окружения `VITE_API_BASE`
 * и снабжён перехватчиком запросов, который автоматически
 * подставляет токен авторизации.
 */
export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Перехватчик исходящих запросов: проставляет заголовок `Authorization`
 * и при необходимости обновляет токены.
 *
 * Запросы из {@link refreshIgnoreEndpoints} пропускаются без изменений.
 * Для остальных запросов:
 * - если в куки-файлах есть `accessToken`, он расшифровывается и подставляется
 *   в заголовок `Authorization`;
 * - если `accessToken` отсутствует, но есть `refreshToken`, выполняется
 *   запрос `/auth/refresh`, полученные токены шифруются и сохраняются
 *   в куки-файлы взамен старых, а новый access-токен подставляется в заголовок;
 * - при ошибке обновления токена показывается уведомление через
 *   {@link showToast}.
 */
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        if(config.url && refreshIgnoreEndpoints.includes(config.url)) {
            return config;
        }

        const accessTokenEncrypted = getCookieByName("accessToken");

        if(accessTokenEncrypted) {
            const accessToken = await decryptFromString(accessTokenEncrypted, import.meta.env.VITE_CRYPTO_KEY);
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            const refreshTokenEncrypted = getCookieByName("refreshToken");

            if(refreshTokenEncrypted) {
                const decryptedRefreshToken = await decryptFromString(refreshTokenEncrypted, import.meta.env.VITE_CRYPTO_KEY);
                console.log("Calling refresh");
                try {
                    const response = await api.post("/auth/refresh", {refreshToken: decryptedRefreshToken});

                    const encryptedAccessToken = await encryptToString(response.data.accessToken, import.meta.env.VITE_CRYPTO_KEY);
                    const accessTokenExpiresIn = response.data.accessTokenExpiresIn;

                    const encryptedRefreshToken = await encryptToString(response.data.refreshToken, import.meta.env.VITE_CRYPTO_KEY);
                    const refreshTokenExpiresIn = response.data.refreshTokenExpiresIn;

                    const accessTokenExpiresAt = Date.now() + accessTokenExpiresIn;
                    const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn;

                    clearCookiesTokens();
                    document.cookie = `accessToken=${encryptedAccessToken}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
                    document.cookie = `accessTokenExpiresAt=${accessTokenExpiresAt}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
                    document.cookie = `refreshToken=${encryptedRefreshToken}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
                    document.cookie = `refreshTokenExpiresAt=${refreshTokenExpiresAt}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;

                    config.headers = config.headers ?? {};
                    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                } catch (error: unknown) {
                    if(axios.isAxiosError(error)) {
                        if(error.response) {
                            store.dispatch(showToast({message: "api.serverError", type: "error"}));
                        } else {
                            store.dispatch(showToast({message: "api.networkError", type: "error"}));
                        }
                    } else {
                        console.error(error);
                    }
                }
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);
