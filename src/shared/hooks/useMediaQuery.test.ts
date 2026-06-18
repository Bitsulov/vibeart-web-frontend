import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery - Возвращает состояние CSS медиазапроса", () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

    const createMockMQ = (matches: boolean) => ({
        matches,
        media: "",
        onchange: null,
        addEventListener: vi.fn(
            (_: string, handler: (e: MediaQueryListEvent) => void) => {
                changeHandler = handler;
            }
        ),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    });

    beforeEach(() => {
        changeHandler = null;
    });

    it("Возвращает true, если медиазапрос совпадает изначально", () => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn(() => createMockMQ(true))
        });

        const { result } = renderHook(() => useMediaQuery("(width >= 1200px)"));

        expect(result.current).toBe(true);
    });

    it("Возвращает false, если медиазапрос не совпадает изначально", () => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn(() => createMockMQ(false))
        });

        const { result } = renderHook(() => useMediaQuery("(width >= 1200px)"));

        expect(result.current).toBe(false);
    });

    it("Обновляет значение при изменении медиазапроса", () => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn(() => createMockMQ(false))
        });

        const { result } = renderHook(() => useMediaQuery("(width >= 1200px)"));

        act(() => {
            changeHandler?.({ matches: true } as MediaQueryListEvent);
        });

        expect(result.current).toBe(true);
    });

    it("Отписывается от изменений при размонтировании", () => {
        const mockMQ = createMockMQ(false);
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn(() => mockMQ)
        });

        const { unmount } = renderHook(() => useMediaQuery("(width >= 1200px)"));
        unmount();

        expect(mockMQ.removeEventListener).toHaveBeenCalledOnce();
    });
});
