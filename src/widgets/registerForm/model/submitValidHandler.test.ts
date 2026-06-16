import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";
import type { AxiosResponse } from "axios";

describe("submitValidHandler - отправляет данные формы регистрации на сервер", () => {
    it("Вызывает функцию отправки с данными формы", async () => {
        const submit = vi.fn().mockResolvedValue({} as AxiosResponse<string>);
        const data = {
            email: "test@example.com",
            password: "123456",
            confirmPassword: "123456",
            agreed: true,
            agreed2: true
        };

        await submitValidHandler(data, submit);

        expect(submit).toHaveBeenCalledWith(data);
    });
});
