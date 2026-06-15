import { describe, it, expect, vi } from "vitest";
import { registerSuccessHandler } from "./registerSuccessHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { QueryClient } from "@tanstack/react-query";

describe("registerSuccessHandler - обрабатывает успешную регистрацию", () => {
    it("Показывает уведомление об отправке кода на указанный email", () => {
        const dispatch = vi.fn();

        registerSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "test@example.com", password: "123456", confirmPassword: "123456" },
            dispatch,
            vi.fn(),
            vi.fn(),
            { invalidateQueries: vi.fn() } as unknown as QueryClient,
            vi.fn()
        );

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: {
                message: "api.registerAccess",
                type: "success",
                params: { email: "test@example.com" }
            }
        });
    });

    it("Сбрасывает поля формы регистрации", () => {
        const setValue = vi.fn();

        registerSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "test@example.com", password: "123456", confirmPassword: "123456" },
            vi.fn(),
            vi.fn(),
            setValue,
            { invalidateQueries: vi.fn() } as unknown as QueryClient,
            vi.fn()
        );

        expect(setValue).toHaveBeenCalledWith("email", "");
        expect(setValue).toHaveBeenCalledWith("password", "");
        expect(setValue).toHaveBeenCalledWith("confirmPassword", "");
        expect(setValue).toHaveBeenCalledWith("agreed", false);
        expect(setValue).toHaveBeenCalledWith("agreed2", false);
    });

    it("Помечает связанные запросы как устаревшие", () => {
        const invalidateQueries = vi.fn();

        registerSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "test@example.com", password: "123456", confirmPassword: "123456" },
            vi.fn(),
            vi.fn(),
            vi.fn(),
            { invalidateQueries } as unknown as QueryClient,
            vi.fn()
        );

        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["register"] });
    });

    it("Переключает форму в режим ввода кода и запоминает отправленный email", () => {
        const setIsEmailSent = vi.fn();
        const setSentEmail = vi.fn();

        registerSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "test@example.com", password: "123456", confirmPassword: "123456" },
            vi.fn(),
            setIsEmailSent,
            vi.fn(),
            { invalidateQueries: vi.fn() } as unknown as QueryClient,
            setSentEmail
        );

        expect(setIsEmailSent).toHaveBeenCalledWith(true);
        expect(setSentEmail).toHaveBeenCalledWith("test@example.com");
    });
});
