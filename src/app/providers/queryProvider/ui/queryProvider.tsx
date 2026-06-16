import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** Свойства компонента {@link QueryProvider}. */
interface QueryProviderProps {
    /** Дочернее дерево, оборачиваемое в провайдер TanStack Query. */
    children: ReactNode;
}

/**
 * Клиент TanStack Query с отключённым повторным запросом данных
 * при возвращении фокуса на окно браузера (`refetchOnWindowFocus`).
 */
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

/**
 * Провайдер TanStack Query.
 *
 * Оборачивает дерево приложения в {@link QueryClientProvider} с экземпляром {@link queryClient}.
 */
export function QueryProvider({ children }: QueryProviderProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
