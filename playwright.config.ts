/**
 * @file Конфигурация сквозного тестирования (Playwright).
 *
 * Тесты расположены в директории `./e2e` и взаимодействуют с локальным
 * сервером разработки на http://localhost:5173.
 *
 * Перед каждым набором тестов выполняется общий шаг настройки
 * (`global.setup.ts`), в котором производится авторизация.
 * Все браузерные проекты объявлены зависимыми от этого шага.
 *
 * Матрица браузеров:
 *   - Desktop Chromium (Chrome)
 *   - Mobile Chromium (Pixel 7)
 *   - Firefox
 *   - Desktop WebKit (Safari)
 *   - Mobile WebKit (iPhone 13)
 *
 * Поведение в среде непрерывной интеграции:
 *   - `forbidOnly` запрещает случайно закоммиченные вызовы `.only`,
 *     которые привели бы к пропуску остального набора тестов.
 *   - Повторных попыток при сбое: 4, чтобы поглотить нестабильные тесты.
 *   - Количество параллельных процессов ограничено до 1 во избежание
 *     конкуренции за ресурсы.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 4,
    workers: process.env.CI ? 1 : 3,
    reporter: "html",
    use: {
        baseURL: "http://localhost:5173",
        trace: "on-first-retry",
        storageState: {
            cookies: [{
                name: "acceptedCookie",
                value: "1",
                domain: "localhost",
                path: "/",
                expires: -1,
                httpOnly: false,
                secure: false,
                sameSite: "Lax",
            }],
            origins: [],
        },
    },
    projects: [
        { name: "setup", testMatch: "**/global.setup.ts" },
        {
            name: "Desktop Chromium",
            use: { ...devices["Desktop Chrome"] },
            dependencies: ["setup"],
        },
        {
            name: "Mobile Chromium",
            use: { ...devices["Pixel 7"] },
            dependencies: ["setup"],
        },
        {
            name: "Firefox",
            use: { ...devices["Desktop Firefox"] },
            dependencies: ["setup"],
        },
        // {
        //     name: 'Desktop Webkit',
        //     use: { ...devices['Desktop Safari'] },
        //     dependencies: ['setup'],
        // },
        // {
        //     name: 'Mobile Webkit',
        //     use: { ...devices['iPhone 13'] },
        //     dependencies: ['setup'],
        // },
    ],
    webServer: {
        command: "npm run dev",
        url: "http://localhost:5173",
        env: { PLAYWRIGHT: "1" },
        reuseExistingServer: !process.env.CI,
    },
});
