/**
 * Импортирует ключ AES-GCM из строки в формате Base64.
 *
 * @param keyBase64 - Ключ шифрования, закодированный в Base64.
 * @returns Объект `CryptoKey`, готовый для шифрования и дешифрования.
 */
async function importKeyFromBase64(keyBase64: string): Promise<CryptoKey> {
    const keyBuffer = Uint8Array.from(atob(keyBase64), c => c.charCodeAt(0));
    return crypto.subtle.importKey("raw", keyBuffer, { name: "AES-GCM" }, true, [
        "encrypt",
        "decrypt"
    ]);
}

/**
 * Шифрует строку алгоритмом AES-GCM с использованием ключа в формате Base64.
 *
 * Случайный вектор инициализации (IV) генерируется на каждый вызов и
 * добавляется в начало зашифрованных данных, после чего результат
 * кодируется в URL-safe Base64 (без `+`, `/` и завершающих `=`).
 *
 * @param text - Исходная строка для шифрования.
 * @param keyBase64 - Ключ шифрования, закодированный в Base64.
 * @returns Зашифрованная строка в URL-safe Base64.
 */
export async function encryptToString(text: string, keyBase64: string): Promise<string> {
    const key = await importKeyFromBase64(keyBase64);

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        data
    );

    const encryptedArray = new Uint8Array(encryptedBuffer);

    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    const base64 = btoa(String.fromCharCode(...combined));

    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Расшифровывает строку, зашифрованную функцией {@link encryptToString}.
 *
 * Преобразует URL-safe Base64 обратно в стандартный, извлекает вектор
 * инициализации (первые 12 байт) и расшифровывает оставшиеся данные
 * алгоритмом AES-GCM.
 *
 * @param str - Зашифрованная строка в URL-safe Base64.
 * @param keyBase64 - Ключ шифрования, закодированный в Base64.
 * @returns Исходная расшифрованная строка.
 */
export async function decryptFromString(str: string, keyBase64: string): Promise<string> {
    const key = await importKeyFromBase64(keyBase64);

    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");

    while (base64.length % 4) {
        base64 += "=";
    }

    const combined = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
}
