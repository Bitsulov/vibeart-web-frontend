import { supportedLangs, defaultLang } from "shared/const/const";

const BASE_URL = import.meta.env.VITE_URL ?? "https://localhost";

/**
 * Статические публичные пути без языкового префикса.
 * Пустая строка — главная страница.
 */
const PUBLIC_PATHS = [
    "",
    "auth",
    "register",
    "forgotPassword",
    "gallery",
    "post/add",
    "album/add",
    "chats",
    "communities",
    "communities/add",
    "settings",
    "notifications",
    "agreement",
    "policy",
    "contacts",
];

/**
 * Формирует абсолютный URL страницы с языковым префиксом.
 *
 * @param lang - Двухбуквенный код языка (`"ru"`, `"en"`).
 * @param path - Путь страницы без ведущего слеша. Пустая строка — главная страница.
 * @returns Абсолютный URL вида `https://vibe-art.ru/ru/gallery`.
 */
function buildUrl(lang: string, path: string): string {
    return path ? `${BASE_URL}/${lang}/${path}` : `${BASE_URL}/${lang}/`;
}

/**
 * Формирует XML-запись одной страницы для карты сайта.
 *
 * Каждая запись содержит основной адрес страницы и альтернативные ссылки
 * на все языковые версии через атрибут `hreflang`, включая `x-default`
 * для языка по умолчанию.
 *
 * @param lang - Двухбуквенный код языка основного адреса записи.
 * @param path - Путь страницы без ведущего слеша.
 * @returns Строка XML-элемента `<url>` с вложенными альтернативными ссылками.
 *
 * @example
 * // buildUrlEntry("ru", "gallery"):
 * <url>
 *    <loc>https://vibe-art.ru/ru/gallery</loc>
 *    <xhtml:link rel="alternate" hreflang="ru" href="https://vibe-art.ru/ru/gallery" />
 *    <xhtml:link rel="alternate" hreflang="en" href="https://vibe-art.ru/en/gallery" />
 *    <xhtml:link rel="alternate" hreflang="x-default" href="https://vibe-art.ru/en/gallery" />
 * </url>
 */
function buildUrlEntry(lang: string, path: string): string {
    const loc = buildUrl(lang, path);

    const alternates = supportedLangs
        .map(l => `        <xhtml:link rel="alternate" hreflang="${l}" href="${buildUrl(l, path)}" />`)
        .join("\n");

    const xDefault = `        <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(defaultLang, path)}" />`;

    return `    <url>
        <loc>${loc}</loc>
${alternates}
${xDefault}
    </url>`;
}

/**
 * Маршрут, отдающий карту сайта в формате XML.
 *
 * Включает все статические публичные страницы для каждого поддерживаемого языка.
 * Каждая страница содержит `hreflang`-ссылки на все языковые версии.
 * Базовый домен берётся из переменной окружения `VITE_URL`.
 * Кешируется на 1 час.
 *
 * @returns HTTP-ответ с XML-содержимым карты сайта.
 */
export function loader() {
    const entries = PUBLIC_PATHS.flatMap(path =>
        supportedLangs.map(lang => buildUrlEntry(lang, path)),
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${entries.join("\n\n")}

</urlset>
`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
