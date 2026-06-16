import { useMemo } from "react";
import type { ReactNode } from "react";
import i18nBase from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { defaultLang } from "shared/const/const";

import en from "shared/locales/en.json";
import ru from "shared/locales/ru.json";

/** Свойства компонента {@link I18nProvider}. */
interface I18nProviderPropsType {
    /** Двухбуквенный код языка, определённый загрузчиком корневого маршрута. */
    lang: string;
    /** Дочернее дерево, которое получает доступ к локализации через контекст i18next. */
    children: ReactNode;
}

/**
 * Провайдер локализации приложения.
 *
 * Передаёт дочерним компонентам доступ к переводам через контекст React.
 * Язык определяется на сервере через {@link detectLanguageFromRequest} и передаётся
 * через свойство `lang`, что обеспечивает одинаковый результат на сервере и клиенте.
 *
 * Каждый язык использует отдельный изолированный объект i18next, созданный через
 * `createInstance`, чтобы параллельные запросы на сервере не мешали друг другу.
 *
 * @param props - Свойства компонента.
 * @param props.lang - Код языка, переданный из загрузчика корневого маршрута.
 * @param props.children - Дочерние компоненты, использующие переводы.
 * @returns Дочерние компоненты, обёрнутые в провайдер i18next.
 *
 * @see {@link https://www.i18next.com/overview/api#createinstance}
 * @see {@link detectLanguageFromRequest}
 */
export const I18nProvider = ({ lang, children }: I18nProviderPropsType) => {
    const instance = useMemo(() => {
        const i = i18nBase.createInstance();
        i.use(initReactI18next).init({
            resources: {
                en: { translation: en },
                ru: { translation: ru }
            },
            lng: lang,
            fallbackLng: defaultLang,
            interpolation: { escapeValue: false },
            showSupportNotice: false
        });
        return i;
    }, [lang]);

    return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
};
