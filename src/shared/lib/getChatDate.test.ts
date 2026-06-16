import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getChatDate } from "./getChatDate";
import i18n from "shared/tests/i18n";

describe("getChatDate - Возвращает форматированную дату для чата", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-11T15:00:00.000Z"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("Возвращает время HH:MM если дата сегодня", () => {
        const date = new Date("2026-04-11T09:30:00.000Z");
        const result = getChatDate(i18n.t, "ru", date);
        expect(result).toMatch(/^\d{2}:\d{2}$/);
        expect(result).toContain("30");
    });

    it("Возвращает daysAgo если дата в пределах месяца", () => {
        const date = new Date("2026-04-06T10:00:00.000Z");
        const result = getChatDate(i18n.t, "ru", date);
        expect(result).toBe("daysAgo");
    });

    it("Возвращает monthsAgo если дата в пределах года", () => {
        const date = new Date("2026-02-01T10:00:00.000Z");
        const result = getChatDate(i18n.t, "ru", date);
        expect(result).toBe("monthsAgo");
    });

    it("Возвращает дату числами если дата старше года", () => {
        const date = new Date("2024-09-01T10:00:00.000Z");
        const result = getChatDate(i18n.t, "ru", date);
        expect(result).toContain("2024");
        expect(result).toContain("09");
    });

    it("Принимает строку ISO как аргумент", () => {
        const result = getChatDate(i18n.t, "ru", "2026-04-11T12:00:00.000Z");
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
    });
});
