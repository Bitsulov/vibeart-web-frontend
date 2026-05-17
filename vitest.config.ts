/**
 * @file Конфигурация среды выполнения модульных тестов (Vitest).
 *
 * Все тестовые файлы в `src/` запускаются в окружении jsdom,
 * которое эмулирует браузерное окружение без запуска настоящего браузера.
 * Глобальные функции Vitest (`describe`, `it`, `expect`, `vi`) доступны
 * без явного импорта — включены через `globals: true`.
 *
 * Покрытие кода:
 *   - Инструмент: V8 (встроенный в Node.js, без дополнительной инструментации).
 *   - Минимальные пороги: 70 % строк кода и 70 % функций.
 *   - Из анализа исключены файлы с моковыми данными (`mockConst.ts`)
 *     и объявления типов (`*.d.ts`), поскольку они не содержат логики.
 *
 * Псевдонимы путей дублируют `vite.config.ts`, чтобы разрешение
 * модулей в тестах было идентично поведению в сборке.
 *
 * @see https://vitest.dev/config/
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/shared/tests/setup.ts'],
        exclude: [
            '**/node_modules/**',
            '**/e2e/**',
        ],
        css: {
            modules: { classNameStrategy: 'non-scoped' }
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.stories.*', 'src/**/*.d.ts', 'src/**/mockConst.ts'],
            thresholds: { lines: 70, functions: 70 }
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            shared: resolve(__dirname, "src/shared"),
            entities: resolve(__dirname, "src/entities"),
            features: resolve(__dirname, "src/features"),
            widgets: resolve(__dirname, "src/widgets"),
            pages: resolve(__dirname, "src/pages"),
            processes: resolve(__dirname, "src/processes"),
            app: resolve(__dirname, "src/app")
        }
    }
});
