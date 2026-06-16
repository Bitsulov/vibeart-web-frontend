import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";

describe("submitValidHandler - обработчик успешной отправки формы создания альбома", () => {
    it("Вызывает onSubmit с функцией навигации в /gallery если файл загружен", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();
        const setIsErrorImg = vi.fn();
        const onSubmit = vi.fn((nav: () => void) => nav());
        const file = new File(["content"], "image.png", { type: "image/png" });

        submitValidHandler(navigate, dispatch, file, setIsErrorImg, onSubmit);

        expect(onSubmit).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith("/gallery", { replace: true });
    });
    it("Вызывает onSubmit с функцией навигации в /gallery если файл не загружен", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();
        const setIsErrorImg = vi.fn();
        const onSubmit = vi.fn((nav: () => void) => nav());

        submitValidHandler(navigate, dispatch, undefined, setIsErrorImg, onSubmit);

        expect(onSubmit).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith("/gallery", { replace: true });
    });
});
