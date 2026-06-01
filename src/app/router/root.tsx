import { Outlet, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import "../index.scss";
import { StoreProvider } from "../providers/storeProvider";
import { I18nProvider } from "../providers/i18nProvider";
import { InitProvider } from "../providers/initProvider";
import { detectLanguageFromRequest } from "shared/lib/detectLanguageFromRequest";
export { Layout } from "./layout";

/**
 * Загрузчик корневого маршрута.
 *
 * Вызывается React Router автоматически при каждом запросе до рендера.
 * Определяет язык интерфейса и передаёт его в дерево компонентов
 * через {@link useLoaderData}.
 *
 * @param args.request - Входящий HTTP-запрос.
 * @returns Объект с полем `lang` — двухбуквенным кодом языка.
 *
 * @see {@link detectLanguageFromRequest}
 */
export async function loader({ request }: LoaderFunctionArgs) {
    return { lang: detectLanguageFromRequest(request) };
}

/**
 * Корневой layout приложения.
 *
 * Оборачивает всё дерево провайдерами: StoreProvider → I18nProvider → InitProvider.
 * Маршрутизация обеспечивается React Router framework mode, текущий маршрут
 * рендерится через `<Outlet />`.
 */
export default function Root() {
    const { lang } = useLoaderData<typeof loader>();

    return (
        <StoreProvider>
            <I18nProvider lang={lang}>
                <InitProvider>
                    <Outlet />
                </InitProvider>
            </I18nProvider>
        </StoreProvider>
    );
}
