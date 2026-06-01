import { describe, expect, it, vi } from "vitest";
import { changeLanguageClickHandler } from "./changeLanguageClickHandler";
import { setLanguage } from "entities/appConfig";

describe("changeLanguageClickHandler - обработчик смены языка", () => {
    const makeMocks = () => ({
        i18n: { changeLanguage: vi.fn().mockResolvedValue(undefined) },
        dispatch: vi.fn(),
    });

    it("Вызывает i18n.changeLanguage с переданным языком", () => {
        const { i18n, dispatch } = makeMocks();

        changeLanguageClickHandler("en", i18n as never, dispatch);

        expect(i18n.changeLanguage).toHaveBeenCalledWith("en");
    });

    it("Диспатчит setLanguage с переданным языком", () => {
        const { i18n, dispatch } = makeMocks();

        changeLanguageClickHandler("en", i18n as never, dispatch);

        expect(dispatch).toHaveBeenCalledWith(setLanguage("en"));
    });
});
