import type { i18n } from "i18next";
import type { Dispatch } from "@reduxjs/toolkit";
import { setLanguage } from "entities/appConfig";

/**
 * Меняет язык интерфейса: обновляет i18n и язык в Redux-хранилище.
 *
 * @param lang - Код нового языка по стандарту BCP 47 (например, `"ru"`, `"en"`).
 * @param i18n - Экземпляр i18next.
 * @param dispatch - Функция записи данных в Redux.
 */
export function changeLanguageClickHandler(lang: string, i18n: i18n, dispatch: Dispatch) {
    i18n.changeLanguage(lang).catch(er => console.error("change language error:", er));

    dispatch(setLanguage(lang));
}
