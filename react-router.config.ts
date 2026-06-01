import { type Config } from "@react-router/dev/config";

/**
 * Конфигурация React Router.
 *
 * Директория `src/app/router` содержит корневые файлы и маршруты приложения.
 * Серверный рендеринг отключается во время Playwright-тестов, чтобы браузер
 * работал напрямую с клиентской сборкой без гидратации.
 */
export default {
    appDirectory: "src/app/router",
    ssr: true,
} satisfies Config;
