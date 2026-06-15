import { describe, it, expect } from "vitest";
import { encryptToString, decryptFromString } from "./crypto";

async function generateKeyBase64(): Promise<string> {
    const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
    const raw = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(raw)));
}

describe("crypto - шифрование и расшифровка строк AES-GCM", () => {
    it("Расшифровывает строку, зашифрованную encryptToString, обратно в исходный текст", async () => {
        const keyBase64 = await generateKeyBase64();

        const encrypted = await encryptToString("hello world", keyBase64);
        const decrypted = await decryptFromString(encrypted, keyBase64);

        expect(decrypted).toBe("hello world");
    });

    it("Возвращает URL-safe Base64 без символов +, / и завершающих =", async () => {
        const keyBase64 = await generateKeyBase64();

        const encrypted = await encryptToString("some text with enough length to produce padding==", keyBase64);

        expect(encrypted).not.toMatch(/[+/=]/);
    });

    it("Шифрует одно и то же значение разными строками при каждом вызове", async () => {
        const keyBase64 = await generateKeyBase64();

        const first = await encryptToString("repeat", keyBase64);
        const second = await encryptToString("repeat", keyBase64);

        expect(first).not.toBe(second);
    });

    it("Не может расшифровать данные другим ключом", async () => {
        const keyBase64 = await generateKeyBase64();
        const otherKeyBase64 = await generateKeyBase64();

        const encrypted = await encryptToString("secret", keyBase64);

        await expect(decryptFromString(encrypted, otherKeyBase64)).rejects.toThrow();
    });
});
