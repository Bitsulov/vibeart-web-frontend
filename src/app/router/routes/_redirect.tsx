import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { detectLanguageFromRequest } from "shared/lib/detectLanguageFromRequest";

/**
 * Загрузчик корневого маршрута `/`.
 *
 * Определяет язык пользователя и перенаправляет на соответствующую
 * языковую версию сайта, например `/ru/` или `/en/`.
 *
 * @param args - Аргументы загрузчика React Router.
 * @param args.request - Входящий HTTP-запрос.
 * @returns Перенаправление на языковую версию главной страницы.
 *
 * @see {@link detectLanguageFromRequest}
 */
export function loader({ request }: LoaderFunctionArgs) {
    const lang = detectLanguageFromRequest(request);
    return redirect(`/${lang}/`);
}

export default function Redirect() {
    return null;
}
