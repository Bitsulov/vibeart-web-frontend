import c from "./headerProfileButton.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import defaultAvatar from "shared/icons/icon-user.svg";
import {useTranslation} from "react-i18next";
import React from "react";

/** Свойства компонента {@link HeaderProfileButton}. */
interface HeaderProfileButtonProps extends Omit<LinkProps, "to"> {
    /** URL аватара пользователя. При отсутствии используется аватар по умолчанию. */
    imageUrl: string;
    /** Признак авторизации. Определяет URL назначения и альтернативный текст. */
    isAuthenticated: boolean;
    /** ULID пользователя для формирования ссылки `/profile/:ulid`. */
    userULID: string;
    /** Имя пользователя для атрибута `alt` изображения аватара. */
    name: string;
    /** Признак открытого бургер-меню (зарезервировано для будущей логики). */
    isBurgerOpen: boolean;
    /** Функция управления состоянием бургер-меню (зарезервировано для будущей логики). */
    setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Кнопка профиля в шапке сайта, отображающая аватар пользователя.
 *
 * Авторизованный пользователь переходит на страницу своего профиля,
 * неавторизованный — на страницу входа. При отсутствии аватара
 * отображается иконка-заглушка.
 */
export const HeaderProfileButton = ({
    imageUrl,
    name,
    userULID,
    isAuthenticated,
    isBurgerOpen: _isBurgerOpen,
    setIsBurgerOpen: _setIsBurgerOpen,
    ...props
}: HeaderProfileButtonProps) => {
    const { t } = useTranslation();
    const alt = isAuthenticated ? name : "user";
    const image = isAuthenticated ? imageUrl || defaultAvatar : defaultAvatar;
    const href = isAuthenticated ? `/profile/${userULID}` : "/auth"
    const ariaLabel = isAuthenticated ? t("ariaLabel.goToProfile") : t("ariaLabel.goToAuth")

	return (
		<Link className={c.link} to={href} aria-label={ariaLabel} {...props}>
            <img
                decoding="async"
                loading="lazy"
                width="80"
                height="80"
                src={image}
                alt={alt}
                className={c.avatar_img}
            />
		</Link>
	)
}
