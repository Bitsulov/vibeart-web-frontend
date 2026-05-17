/**
 * @file Конфигурация сборщика и сервера разработки (Vite).
 *
 * Псевдонимы путей соответствуют слоям Feature-Sliced Design и должны
 * оставаться синхронизированы с `tsconfig.app.json` и `vitest.config.ts`,
 * чтобы разрешение модулей было одинаковым в сервере разработки,
 * системе проверки типов и среде выполнения тестов.
 *
 * @see https://vitejs.dev/config/
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            shared: path.resolve(__dirname, "src/shared"),
            entities: path.resolve(__dirname, "src/entities"),
            features: path.resolve(__dirname, "src/features"),
            widgets: path.resolve(__dirname, "src/widgets"),
            pages: path.resolve(__dirname, "src/pages"),
            processes: path.resolve(__dirname, "src/processes"),
            app: path.resolve(__dirname, "src/app")
        }
    }
})
