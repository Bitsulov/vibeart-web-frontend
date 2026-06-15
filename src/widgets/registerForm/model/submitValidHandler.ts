import type {IRegisterForm} from "../lib/types";
import type {AxiosResponse} from "axios";
import type {SignUpRequest} from "entities/user";

type SubmitFn = (data: SignUpRequest) => Promise<AxiosResponse<string>>;

/**
 * Обрабатывает успешную валидацию формы регистрации: отправляет запрос
 * на сервер, сбрасывает все поля формы и помечает связанные запросы
 * как устаревшие для повторной загрузки.
 *
 * @param data - Данные формы с e-mail, паролем и подтверждением согласий.
 * @param submit - Функция отправки данных регистрации на сервер.
 */
export async function submitValidHandler(
    data: IRegisterForm,
    submit: SubmitFn
) {
    submit(data)
}
