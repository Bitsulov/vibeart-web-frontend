import { describe, it, expect, vi } from "vitest";
import { onSubmitForm } from "./onSubmitForm";

describe("onSubmitForm - обработка отправки формы создания альбома", () => {
    it("Устанавливает ошибку и не перенаправляет на другую страницу если файл не загружен", () => {
        const navigation = vi.fn();
        const setIsErrorImg = vi.fn();

        onSubmitForm(navigation, undefined, setIsErrorImg);

        expect(setIsErrorImg).toHaveBeenCalledWith(true);
        expect(navigation).not.toHaveBeenCalled();
    });
    it("Сбрасывает ошибку и перенаправляет на другую страницу если файл загружен", () => {
        const navigation = vi.fn();
        const setIsErrorImg = vi.fn();
        const file = new File(["content"], "image.png", { type: "image/png" });

        onSubmitForm(navigation, file, setIsErrorImg);

        expect(setIsErrorImg).toHaveBeenCalledWith(false);
        expect(navigation).toHaveBeenCalled();
    });
});
