import c from "./modal.module.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageItem } from "features/languageItem";
import { StylizedButton } from "features/stylizedButton";
import { modalClickHandler } from "../model/modalClickHandler";
import { closeButtonClickHandler } from "../model/closeButtonClickHandler";
import clsx from "clsx";
import { defaultTransitionTime } from "shared/const/const";

/** Свойства компонента {@link Modal}. */
interface ModalProps {
    /** Признак того, что модальное окно смены языка в данный момент открыто. */
    isShowChangeLanguage: boolean;
    /** Функция обновления признака видимости модального окна смены языка. */
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>;
    /** Конфигурация доступных языков: ключ — код языка, значение — массив с параметрами отображения. */
    languagesConfig: Record<string, string[]>;
}

/**
 * Модальное окно выбора языка интерфейса.
 *
 * Отображает список доступных языков через {@link LanguageItem}. Закрывается по клику
 * на фон, кнопку закрытия или кнопку «Закрыть». Анимация скрытия реализована через
 * CSS-переход длительностью, считываемой из CSS-переменной `--transition-time`.
 */
export const Modal = ({
    languagesConfig,
    isShowChangeLanguage,
    setIsShowChangeLanguage,
    ...props
}: ModalProps) => {
    const { t } = useTranslation();

    const [isDisappearring, setIsDisappearring] = useState(false);
    const transitionTime =
        parseInt(
            globalThis
                .getComputedStyle?.(globalThis.document?.documentElement)
                ?.getPropertyValue("--transition-time")
        ) || defaultTransitionTime;

    return (
        <>
            {isShowChangeLanguage && (
                <div
                    onClick={() =>
                        closeButtonClickHandler(
                            setIsDisappearring,
                            transitionTime,
                            setIsShowChangeLanguage
                        )
                    }
                    className={clsx(c.background, isDisappearring && c.close)}
                >
                    <dialog
                        open
                        onClick={e => modalClickHandler(e)}
                        aria-modal="true"
                        className={c.modal}
                        {...props}
                    >
                        <div className={c.top}>
                            <h3 className={c.title}>{t("choosingLanguage")}</h3>
                        </div>
                        <ul className={c.language_list}>
                            {Object.values(languagesConfig).map(
                                ([img, title, ariaLabel, alt, value]) => (
                                    <LanguageItem
                                        key={value}
                                        imageUrl={img}
                                        title={title}
                                        ariaLabel={ariaLabel}
                                        alt={alt}
                                        value={value}
                                    />
                                )
                            )}
                        </ul>
                        <div className={c.bottom}>
                            <StylizedButton
                                ariaLabel={t("ariaLabel.closeLanguageModal")}
                                onClick={() =>
                                    closeButtonClickHandler(
                                        setIsDisappearring,
                                        transitionTime,
                                        setIsShowChangeLanguage
                                    )
                                }
                            >
                                {t("Close")}
                            </StylizedButton>
                        </div>
                        <button
                            onClick={() =>
                                closeButtonClickHandler(
                                    setIsDisappearring,
                                    transitionTime,
                                    setIsShowChangeLanguage
                                )
                            }
                            className={c.close_button}
                        ></button>
                    </dialog>
                </div>
            )}
        </>
    );
};
