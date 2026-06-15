import { describe, it, expect, vi } from "vitest";
import { sendCodeSuccessHandler } from "./sendCodeSuccessHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";

describe("sendCodeSuccessHandler - показывает уведомление об успешной повторной отправке кода", () => {
    it("Показывает уведомление с адресом электронной почты, на который отправлен код", () => {
        const dispatch = vi.fn();

        sendCodeSuccessHandler({} as AxiosResponse<string>, { email: "test@example.com" }, dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: {
                message: "api.sendCodeAccess",
                type: "success",
                params: { email: "test@example.com" }
            }
        });
    });
});
