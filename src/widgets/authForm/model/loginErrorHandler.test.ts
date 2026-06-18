import { describe, it, expect, vi } from "vitest";
import { loginErrorHandler } from "./loginErrorHandler";
import { showToast } from "features/toast";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

function createError(statusCode: number): AxiosError<AppError> {
    return {
        response: { data: { statusCode } }
    } as AxiosError<AppError>;
}

describe("loginErrorHandler - показывает уведомление об ошибке авторизации", () => {
    it("Показывает уведомление о неверном логине или пароле при статусе 401", () => {
        const dispatch = vi.fn();

        loginErrorHandler(createError(401), dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.invalidEmailPassword", type: "error" }
        });
    });

    it("Показывает уведомление о ненайденном пользователе при статусе 404", () => {
        const dispatch = vi.fn();

        loginErrorHandler(createError(404), dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.userNotFound", type: "error" }
        });
    });

    it("Показывает уведомление о запрете доступа при статусе 403", () => {
        const dispatch = vi.fn();

        loginErrorHandler(createError(403), dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.forbiddenError", type: "error" }
        });
    });

    it("Показывает уведомление об ошибке сервера при статусе 500", () => {
        const dispatch = vi.fn();

        loginErrorHandler(createError(500), dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.serverError", type: "error" }
        });
    });

    it("Показывает уведомление о неизвестной ошибке при неожиданном статусе", () => {
        const dispatch = vi.fn();

        loginErrorHandler(createError(502), dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.unknownError", type: "error" }
        });
    });
});
