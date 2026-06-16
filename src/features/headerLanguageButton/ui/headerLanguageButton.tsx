import c from "./headerLanguageButton.module.scss";
import { useTranslation } from "react-i18next";
import { languageButtonClickHandler } from "../model/languageButtonClickHandler";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";
import { useEffect, useState } from "react";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { defaultTransitionTime } from "shared/const/const";

/** Свойства компонента {@link HeaderLanguageButton}. */
interface HeaderLanguageButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** Функция переключения видимости панели выбора языка. */
    setIsShowChangeLanguage: Dispatch<SetStateAction<boolean>>;
    /** Признак того, что панель выбора языка открыта (управляет `aria-expanded`). */
    isShowChangeLanguage: boolean;
    /** Признак открытого бургер-меню. При `true` кнопка скрывается с задержкой,
     *  соответствующей длительности CSS-анимации меню. */
    isBurgerOpen: boolean;
    /** Словарь доступных языков: ключ — код языка, значение — массив
     *  `[флаг, название, ariaLabel, alt, код]`. */
    languagesConfig: Record<string, string[]>;
}

/**
 * Кнопка переключения языка интерфейса в шапке сайта.
 *
 * Отображает флаг текущего языка. При открытии бургер-меню кнопка
 * скрывается с задержкой, равной трети длительности CSS-перехода,
 * чтобы не пересекаться визуально с анимацией меню.
 */
export const HeaderLanguageButton = ({
    setIsShowChangeLanguage,
    isShowChangeLanguage,
    isBurgerOpen,
    languagesConfig,
    ...props
}: HeaderLanguageButtonProps) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);
    const languageData = languagesConfig[currentLanguage] || languagesConfig["en"];
    const [isShowButton, setIsShowButton] = useState<boolean>(true);
    const transitionTime =
        parseInt(
            globalThis
                .getComputedStyle?.(globalThis.document?.documentElement)
                ?.getPropertyValue("--transition-time")
        ) || defaultTransitionTime;

    useEffect(() => {
        if (isBurgerOpen) {
            const timeout = setTimeout(() => {
                setIsShowButton(false);
            }, transitionTime / 3);

            return () => clearTimeout(timeout);
        } else {
            setIsShowButton(true);
        }
    }, [isBurgerOpen, transitionTime]);

    return (
        <>
            {isShowButton && (
                <button
                    className={clsx(c.button_language, isBurgerOpen && c.hiding)}
                    aria-expanded={isShowChangeLanguage}
                    {...props}
                    aria-label={t("ariaLabel.showLanguageToggler")}
                    onClick={() => languageButtonClickHandler(setIsShowChangeLanguage)}
                >
                    <img
                        loading="lazy"
                        decoding="async"
                        width="19"
                        height="19"
                        src={languageData[0]}
                        alt={t(languageData[3])}
                        className={c.flag_img}
                    />
                </button>
            )}
        </>
    );
};
