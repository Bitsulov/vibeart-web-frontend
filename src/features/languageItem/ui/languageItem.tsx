import c from "./languageItem.module.scss";
import {useTranslation} from "react-i18next";
import {changeLanguageClickHandler} from "../model/changeLanguageClickHandler";
import {useDispatch} from "react-redux";
import React from "react";

/** Свойства компонента {@link LanguageItem}. */
interface LanguageItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** URL изображения флага языка. */
    imageUrl: string;
    /** Человекочитаемое название языка (например, `"Русский"`, `"English"`). */
    title: string;
    /** Ключ локализации для атрибута `aria-label` кнопки. */
    ariaLabel: string;
    /** Ключ локализации для атрибута `alt` изображения флага. */
    alt: string;
    /** Код языка по стандарту BCP 47 (например, `"ru"`, `"en"`). */
    value: string;
}

/**
 * Пункт списка выбора языка интерфейса.
 *
 * При нажатии переключает язык через i18next и обновляет код языка
 * в хранилище Redux.
 */
export const LanguageItem = ({ imageUrl, title, ariaLabel, alt, value, ...props }: LanguageItemProps) => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();

	return (
		<button
            onClick={() => changeLanguageClickHandler(value, i18n, dispatch)}
            aria-label={t(ariaLabel)}
            className={c.button}
            {...props}
        >
            <img decoding="async" width="20" height="20" src={imageUrl} alt={t(alt)} className={c.image} />
            <p className={c.title}>{title}</p>
		</button>
	)
}
