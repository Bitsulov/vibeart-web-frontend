import c from "./headerProfileButton.module.scss";
import { Link, type LinkProps, useNavigate } from "react-router-dom";
import defaultAvatar from "shared/icons/icon-user.svg";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Dropdown } from "features/dropdown";
import { dropdownOptions } from "../config/dropdownOptions";
import { useDispatch } from "react-redux";
import { buttonMouseEnterHandler } from "../model/buttonMouseEnterHandler";
import { buttonMouseLeaveHandler } from "../model/buttonMouseLeaveHandler";
import { dropdownClickHandler } from "../model/dropdownClickHandler";
import { useQueryClient } from "@tanstack/react-query";

/** Свойства компонента {@link HeaderProfileButton}. */
interface HeaderProfileButtonProps extends Omit<LinkProps, "to"> {
    /** URL аватара пользователя. При отсутствии используется аватар по умолчанию. */
    imageUrl: string;
    /** Признак авторизации. Определяет URL назначения и альтернативный текст. */
    isAuthenticated: boolean;
    /** UUID пользователя для формирования ссылки `/profile/:uuid`. */
    userUUID: string;
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
    userUUID,
    isAuthenticated,
    isBurgerOpen: _isBurgerOpen,
    setIsBurgerOpen: _setIsBurgerOpen,
    ...props
}: HeaderProfileButtonProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const alt = isAuthenticated ? name : "user";
    const image = isAuthenticated ? imageUrl || defaultAvatar : defaultAvatar;
    const href = isAuthenticated ? `/profile/${userUUID}` : "/auth";
    const ariaLabel = isAuthenticated
        ? t("ariaLabel.goToProfile")
        : t("ariaLabel.goToAuth");
    const onMouseEnter = isAuthenticated ? buttonMouseEnterHandler : () => {};
    const onMouseLeave = isAuthenticated ? buttonMouseLeaveHandler : () => {};

    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

    const options = dropdownOptions.map(option => ({
        ...option,
        text: option.text(t),
        color: option.color(),
        ariaLabel: option.ariaLabel?.(t),
        onClick: () => option.onClick(navigate, dispatch, queryClient)
    }));

    return (
        <Link
            onMouseEnter={() => onMouseEnter(setIsOpenDropdown)}
            onMouseLeave={() => onMouseLeave(setIsOpenDropdown)}
            className={c.link}
            to={href}
            aria-label={ariaLabel}
            {...props}
        >
            <Dropdown
                onClick={e => dropdownClickHandler(e)}
                options={options}
                setIsOpen={setIsOpenDropdown}
                isOpen={isOpenDropdown}
                id="headerDropdown"
                className={c.dropdown}
            />
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
    );
};
