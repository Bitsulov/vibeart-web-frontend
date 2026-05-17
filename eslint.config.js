/**
 * @file Конфигурация статического анализатора кода (ESLint) в плоском формате.
 *
 * Применяемые наборы правил для файлов TypeScript и TSX:
 *   - `@eslint/js` recommended — базовые правила JavaScript.
 *   - `typescript-eslint` recommended — правила, специфичные для TypeScript.
 *   - `eslint-plugin-react-hooks` recommended — соблюдение правил хуков React.
 *   - `eslint-plugin-react-refresh` (Vite) — предупреждает о компонентах,
 *     которые не могут быть безопасно обновлены без перезагрузки страницы.
 *
 * Нестандартные правила:
 *   - `@typescript-eslint/no-unused-vars` — переменные и параметры с именем,
 *     начинающимся на `_`, не считаются ошибкой. Это позволяет намеренно
 *     игнорировать элементы деструктуризации.
 *   - `react-hooks/set-state-in-effect` — отключено, так как в проекте
 *     используется шаблон, намеренно нарушающий это правило.
 *
 * Переопределения для тестовых файлов (`*.test.ts`, `*.test.tsx`):
 *   - `@typescript-eslint/no-explicit-any` — снято ограничение, чтобы
 *     не усложнять типизацию заглушек и шпионов.
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist', 'coverage']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        ignores: [
            "coverage/**"
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
            }],
            "react-hooks/set-state-in-effect": "off"
        }
    },
    {
        files: ["**/*.test.ts", "**/*.test.tsx"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        }
    },
]);
