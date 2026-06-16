import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";

describe("submitValidHandler - успешная отправка формы изменения пароля", () => {
    it("Переключает форму в шаг ввода кода", () => {
        const setValue = vi.fn();
        const setIsPasswordSent = vi.fn();
        const setNewPasswordResult = vi.fn();

        submitValidHandler(setValue, setIsPasswordSent, setNewPasswordResult, "NewPass1");

        expect(setIsPasswordSent).toHaveBeenCalledWith(true);
    });

    it("Сохраняет новый пароль", () => {
        const setValue = vi.fn();
        const setIsPasswordSent = vi.fn();
        const setNewPasswordResult = vi.fn();

        submitValidHandler(setValue, setIsPasswordSent, setNewPasswordResult, "NewPass1");

        expect(setNewPasswordResult).toHaveBeenCalledWith("NewPass1");
    });

    it("Сбрасывает все три поля пароля", () => {
        const setValue = vi.fn();
        const setIsPasswordSent = vi.fn();
        const setNewPasswordResult = vi.fn();

        submitValidHandler(setValue, setIsPasswordSent, setNewPasswordResult, "NewPass1");

        expect(setValue).toHaveBeenCalledWith("oldPassword", "");
        expect(setValue).toHaveBeenCalledWith("newPassword", "");
        expect(setValue).toHaveBeenCalledWith("confirmNewPassword", "");
    });
});
