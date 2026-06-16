import { api } from "shared/api/instance";
import type { AxiosResponse } from "axios";
import type {
    AuthResponse,
    RefreshRequest,
    SendCodeRequest,
    SignInRequest,
    SignUpRequest,
    UserDetailResponse,
    VerifyRequest
} from "../lib/types";

const urls = {
    baseUrlAuth: "/auth",
    baseUrlUser: "/users",
    register: function () {
        return `${this.baseUrlAuth}/register`;
    },
    sendCode: function () {
        return `${this.baseUrlAuth}/send`;
    },
    verify: function () {
        return `${this.baseUrlAuth}/verify`;
    },
    login: function () {
        return `${this.baseUrlAuth}/login`;
    },
    refresh: function () {
        return `${this.baseUrlAuth}/refresh`;
    },
    user: function () {
        return `${this.baseUrlAuth}/user`;
    }
};

/**
 * Регистрирует нового пользователя по адресу электронной почты и паролю.
 *
 * После успешной регистрации сервер отправляет на указанный адрес
 * код подтверждения, который нужно передать в {@link verify}.
 *
 * @param data - объект {@link SignUpRequest}.
 * @returns Ответ сервера.
 */
export async function register(data: SignUpRequest): Promise<AxiosResponse<string>> {
    console.log("Calling register", data);
    return api.post(urls.register(), data);
}

/**
 * Запрашивает повторную отправку кода подтверждения на почту пользователя.
 *
 * @param data - объект {@link SendCodeRequest}.
 * @returns Ответ сервера.
 */
export async function sendCode(data: SendCodeRequest): Promise<AxiosResponse<string>> {
    console.log("Calling send", data);
    return api.post(urls.sendCode(), data);
}

/**
 * Подтверждает адрес электронной почты пользователя кодом,
 * полученным после {@link register} или {@link sendCode}.
 *
 * @param data - объект {@link VerifyRequest}.
 * @returns Пара токенов авторизации и `UUID` пользователя: {@link AuthResponse}.
 */
export async function verify(data: VerifyRequest): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling verify", data);
    return api.post(urls.verify(), data);
}

/**
 * Авторизует пользователя по адресу электронной почты и паролю.
 *
 * @param data - объект {@link SignInRequest}.
 * @returns Пара токенов авторизации и `UUID` пользователя: {@link AuthResponse}.
 */
export async function login(data: SignInRequest): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling login", data);
    return api.post(urls.login(), data);
}

/**
 * Обновляет пару токенов авторизации по `refreshToken`.
 *
 * @param data - объект {@link RefreshRequest}.
 * @returns Новая пара токенов авторизации и `UUID` пользователя: {@link AuthResponse}.
 */
export async function refresh(
    data: RefreshRequest
): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling refresh", data);
    return api.post(urls.refresh(), data);
}

/**
 * Получает данные текущего авторизованного пользователя.
 *
 * @returns Профиль пользователя, соответствующего токену авторизации запроса: {@link UserDetailResponse}.
 */
export async function getPrincipalUser(): Promise<AxiosResponse<UserDetailResponse>> {
    console.log("Calling principal user");
    return api.get(urls.user());
}
