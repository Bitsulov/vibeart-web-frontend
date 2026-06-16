/**
 * @file Вспомогательная функция для рендера компонентов в тестах.
 *
 * Оборачивает тестируемый компонент во все необходимые провайдеры:
 * Redux-хранилище, i18next и React Router, — воспроизводя окружение,
 * близкое к боевому приложению.
 */
import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RootState } from "app/store";
import { rootReducer } from "app/store/rootReducer";
import i18n from "../tests/i18n";

/** Параметры рендера компонента в тестовом окружении. */
interface Options extends RenderOptions {
    /** Начальное состояние Redux-хранилища. Используется для тестирования
     *  компонентов, зависящих от конкретных данных в хранилище. */
    preloadedState?: Partial<RootState>;
    /** Начальный маршрут для `MemoryRouter`. По умолчанию `"/"`. */
    route?: string;
}

/**
 * Рендерит компонент React в изолированном тестовом окружении
 * с полным набором провайдеров приложения.
 *
 * Создаёт отдельный экземпляр Redux-хранилища и клиента TanStack Query
 * для каждого теста, что предотвращает утечку состояния между тестами.
 *
 * @param ui - Тестируемый элемент React.
 * @param options - Дополнительные параметры: начальное состояние
 *   хранилища (`preloadedState`), маршрут (`route`) и опции
 *   `@testing-library/react`.
 * @returns Результат `render` из `@testing-library/react`, дополненный
 *   ссылкой на созданный экземпляр хранилища (`store`).
 *
 * @example
 * const { getByText } = renderWithProviders(<MyComponent />, {
 *   preloadedState: { user: { isAuthenticated: true } },
 *   route: "/profile/00000000-0000-4000-8000-00000000000b",
 * });
 */
export function renderWithProviders(
    ui: ReactElement,
    { preloadedState, route = "/", ...options }: Options = {}
) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState
    });

    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <I18nextProvider i18n={i18n}>
                    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
                </I18nextProvider>
            </QueryClientProvider>
        </Provider>
    );

    return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
