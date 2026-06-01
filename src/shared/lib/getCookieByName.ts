/**
 * Возвращает значение куки-файла по имени или `null`, если куки-файл не найдена.
 *
 * @param name - имя куки.
 * @returns Значение куки-файла или `null`.
 *
 * @example
 * getCookieByName("acceptedCookie"); // "1" | null
 */
export function getCookieByName(name: string) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}
