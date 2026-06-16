import { describe, it, expect } from "vitest";
import { detectLanguageFromRequest } from "./detectLanguageFromRequest";

const makeRequest = (url: string, acceptLanguage?: string) =>
    new Request(
        url,
        acceptLanguage ? { headers: { "accept-language": acceptLanguage } } : {}
    );

describe("detectLanguageFromRequest - определяет язык интерфейса из HTTP-запроса", () => {
    it("определяет язык из первого сегмента пути URL", () => {
        expect(
            detectLanguageFromRequest(makeRequest("http://example.com/ru/gallery"))
        ).toBe("ru");
        expect(
            detectLanguageFromRequest(makeRequest("http://example.com/en/profile"))
        ).toBe("en");
    });

    it("определяет язык из заголовка Accept-Language, если путь не содержит поддерживаемый язык", () => {
        expect(
            detectLanguageFromRequest(
                makeRequest("http://example.com/", "ru-RU,ru;q=0.9")
            )
        ).toBe("ru");
        expect(
            detectLanguageFromRequest(
                makeRequest("http://example.com/", "en-US,en;q=0.8")
            )
        ).toBe("en");
    });

    it("возвращает язык по умолчанию, если ни путь, ни заголовок не содержат поддерживаемый язык", () => {
        expect(
            detectLanguageFromRequest(
                makeRequest("http://example.com/fr/page", "fr-FR,fr;q=0.9")
            )
        ).toBe("en");
    });

    it("возвращает язык по умолчанию, если информация о языке отсутствует", () => {
        expect(detectLanguageFromRequest(makeRequest("http://example.com/"))).toBe("en");
    });
});
