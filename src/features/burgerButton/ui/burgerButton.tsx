import c from "./burgerButton.module.scss";
import clsx from "clsx";
import { burgerButtonClickHandler } from "../model/burgerButtonClickHandler";
import { useTranslation } from "react-i18next";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

/**
 * Свойства компонента {@link BurgerButton}.
 *
 * Поля `imageUrl`, `isAuthenticated`, `name` и `userUUID` передаются
 * из родителя, но не используются в самой кнопке — они нужны дочернему
 * меню (`BurgerMenuAuth`) и передаются вместе как единый набор props.
 */
interface BurgerButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** URL аватара пользователя (передаётся вниз в меню). */
    imageUrl: string;
    /** Признак авторизации (определяет тип меню). */
    isAuthenticated: boolean;
    /** Имя пользователя (передаётся вниз в меню). */
    name: string;
    /** UUID пользователя для формирования ссылки на профиль. */
    userUUID: string;
    /** Текущее состояние меню: `true` — открыто, `false` — закрыто. */
    isBurgerOpen: boolean;
    /** Функция обновления состояния открытия меню. */
    setIsBurgerOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Анимированная кнопка-«гамбургер» для открытия и закрытия мобильного меню.
 *
 * Три горизонтальные полоски анимируются в крестик при открытом меню
 * через CSS-класс. Атрибуты `aria-expanded` и `aria-controls` обеспечивают
 * доступность для программ чтения с экрана.
 */
export const BurgerButton = ({
    imageUrl: _imageUrl,
    name: _name,
    userUUID: _userUUID,
    isAuthenticated: _isAuthenticated,
    isBurgerOpen,
    setIsBurgerOpen,
    ...props
}: BurgerButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            className={clsx(c.button_burger, isBurgerOpen && c.open)}
            aria-expanded={isBurgerOpen}
            aria-controls="burgerMenu"
            aria-label={t("ariaLabel.openBurgerMenu")}
            onClick={() => burgerButtonClickHandler(setIsBurgerOpen)}
            {...props}
        >
            <span className={c.button_burger_line} aria-hidden="true"></span>
            <span className={c.button_burger_line} aria-hidden="true"></span>
            <span className={c.button_burger_line} aria-hidden="true"></span>
        </button>
    );
};
