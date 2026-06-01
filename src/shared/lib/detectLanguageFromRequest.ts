import { supportedLangs, defaultLang } from "shared/const/const";

/**
 * Определяет язык интерфейса из входящего HTTP-запроса.
 *
 * Порядок приоритета:
 * 1. Первый сегмент пути URL (`/ru/...`, `/en/...`).
 * 2. Заголовок `Accept-Language` из HTTP-запроса.
 * 3. Резервное значение `"en"`.
 *
 * @example
 * // GET /ru/gallery
 * detectLanguageFromRequest(request); // "ru"
 *
 * @example
 * // GET / (Accept-Language: ru-RU,ru;q=0.9)
 * detectLanguageFromRequest(request); // "ru"
 *
 * @param request - Входящий HTTP-запрос.
 * @returns Двухбуквенный код языка.
 */
export function detectLanguageFromRequest(request: Request): string {
    const url = new URL(request.url);
    const pathLang = url.pathname.split("/")[1];

    if (supportedLangs.includes(pathLang)) return pathLang;

    const headerLang = request.headers
        .get("accept-language")
        ?.split(",")[0]
        ?.split("-")[0]
        ?.toLowerCase();

    if (headerLang && supportedLangs.includes(headerLang)) return headerLang;

    return defaultLang;
}
