const BASE_URL = import.meta.env.VITE_URL;

/**
 * Маршрут, отдающий файл `robots.txt` для поисковых роботов.
 *
 * Разрешает индексацию всего сайта и закрывает путь `/api/`.
 * Указывает на карту сайта. Кешируется на 24 часа.
 * Базовый домен берётся из переменной окружения `VITE_URL`.
 *
 * @returns HTTP-ответ с текстовым содержимым файла `robots.txt`.
 *
 * @example
 * // Содержимое сформированного файла:
 * User-agent: *
 * Allow: /
 * Disallow: /api/
 *
 * Sitemap: https://vibe-art.ru/sitemap.xml
 */
export function loader() {
    const content = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        "",
        `Sitemap: ${BASE_URL}/sitemap.xml`,
        ""
    ].join("\n");

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400"
        }
    });
}
