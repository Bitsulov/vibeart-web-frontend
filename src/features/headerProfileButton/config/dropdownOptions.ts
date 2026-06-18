import { LogOut, type LucideIcon } from "lucide-react";
import type { TFunction } from "i18next";
import { logoutClickHandler } from "widgets/header/model/logoutClickHandler";
import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import type { QueryClient } from "@tanstack/react-query";

/**
 * Пункты выпадающего меню кнопки профиля в шапке сайта.
 *
 * Каждый пункт содержит иконку, текстовый ключ перевода,
 * цвет через CSS-переменную и обработчик нажатия.
 */
export const dropdownOptions: {
    icon: LucideIcon;
    text: (t: TFunction) => string;
    color: () => string;
    ariaLabel?: (t: TFunction) => string;
    onClick: (
        navigate: NavigateFunction,
        dispatch: Dispatch,
        queryClient: QueryClient
    ) => void;
}[] = [
    {
        icon: LogOut,
        text: t => t("Logout"),
        color: () =>
            globalThis
                .getComputedStyle?.(globalThis.document?.documentElement)
                ?.getPropertyValue("--negative-active")
                ?.trim() || "#C40000",
        ariaLabel: t => t("ariaLabel.logout"),
        onClick: (navigate, dispatch, queryClient) =>
            logoutClickHandler(navigate, dispatch, queryClient)
    }
];
