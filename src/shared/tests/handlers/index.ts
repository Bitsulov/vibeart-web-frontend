/**
 * @file Обработчики сетевых запросов MSW для тестового окружения.
 *
 * Каждый обработчик перехватывает конкретный HTTP-запрос и возвращает
 * фиктивный ответ, не обращаясь к реальному серверу. Список пополняется
 * по мере появления новых API-вызовов в тестах.
 */
import {http, HttpResponse} from "msw";
import {authResponseMock, userDetailResponseMock} from "entities/user";

export const handlers = [
    http.post("*/auth/register", () => HttpResponse.text("ok")),
    http.post("*/auth/send", () => HttpResponse.text("ok")),
    http.post("*/auth/verify", () => HttpResponse.json(authResponseMock)),
    http.post("*/auth/login", () => HttpResponse.json(authResponseMock)),
    http.post("*/auth/refresh", () => HttpResponse.json(authResponseMock)),
    http.get("*/auth/user", () => HttpResponse.json(userDetailResponseMock)),
];
