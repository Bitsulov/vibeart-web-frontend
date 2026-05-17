/**
 * @file Экземпляр MSW-сервера для перехвата сетевых запросов в тестах.
 *
 * Создаётся один раз и используется в `setup.ts` через хуки
 * `beforeAll` / `afterEach` / `afterAll`. Обработчики запросов
 * объявлены в `handlers/index.ts`.
 */
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
