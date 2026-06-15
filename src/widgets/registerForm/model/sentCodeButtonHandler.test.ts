import { describe, it, expect, vi } from "vitest";
import { sentCodeButtonHandler } from "./sentCodeButtonHandler";
import type { AxiosResponse } from "axios";

describe("sentCodeButtonHandler - обрабатывает повторную отправку кода подтверждения", () => {
    it("Блокирует кнопку перед отправкой запроса", () => {
        const setIsAllowSentCode = vi.fn();
        const sendCode = vi.fn().mockResolvedValue({} as AxiosResponse<string>);

        sentCodeButtonHandler(setIsAllowSentCode, vi.fn(), "test@example.com", sendCode);

        expect(setIsAllowSentCode).toHaveBeenCalledWith(false);
        expect(sendCode).toHaveBeenCalledWith({ email: "test@example.com" });
    });

    it("При успешной отправке сбрасывает таймер и оставляет кнопку заблокированной", async () => {
        const setIsAllowSentCode = vi.fn();
        const setTimer = vi.fn();
        const sendCode = vi.fn().mockResolvedValue({} as AxiosResponse<string>);

        sentCodeButtonHandler(setIsAllowSentCode, setTimer, "test@example.com", sendCode);

        await vi.waitFor(() => {
            expect(setTimer).toHaveBeenCalledWith(120);
        });

        expect(setIsAllowSentCode).toHaveBeenCalledTimes(2);
        expect(setIsAllowSentCode).toHaveBeenNthCalledWith(2, false);
    });

    it("При ошибке отправки снова разрешает повторную отправку", async () => {
        const setIsAllowSentCode = vi.fn();
        const setTimer = vi.fn();
        const sendCode = vi.fn().mockRejectedValue(new Error("network error"));

        sentCodeButtonHandler(setIsAllowSentCode, setTimer, "test@example.com", sendCode);

        await vi.waitFor(() => {
            expect(setIsAllowSentCode).toHaveBeenCalledTimes(2);
        });

        expect(setIsAllowSentCode).toHaveBeenNthCalledWith(2, true);
        expect(setTimer).not.toHaveBeenCalled();
    });
});
