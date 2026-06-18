import type { IAuthForm } from "../lib/types";
import type { AxiosResponse } from "axios";
import type { AuthResponse, SignInRequest } from "entities/user";

type LoginFn = (data: SignInRequest) => Promise<AxiosResponse<AuthResponse>>;

/**
 * Обрабатывает успешную отправку формы авторизации и сбрасывает поля.
 *
 * @param data - Данные формы с e-mail и паролем.
 * @param login - Функция отправки запроса авторизации на сервер.
 */
export async function submitValidHandler(data: IAuthForm, login: LoginFn) {
    await login(data);
}
