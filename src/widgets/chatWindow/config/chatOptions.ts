import { type LucideIcon, Trash2 } from "lucide-react";
import type { TFunction } from "i18next";
import { deleteChatClickHandler } from "../model/deleteChatClickHandler";
import React from "react";

/** Пункты выпадающего списка настроек чата. */
export const chatOptionsConfig: {
    icon: LucideIcon;
    text: (t: TFunction) => string;
    color: () => string;
    ariaLabel?: (t: TFunction) => string;
    onClick: (setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>) => void;
}[] = [
    {
        icon: Trash2,
        text: t => t("chat.delete"),
        ariaLabel: t => t("ariaLabel.deleteChat"),
        color: () =>
            globalThis
                .getComputedStyle?.(globalThis.document?.documentElement)
                ?.getPropertyValue("--negative-active")
                ?.trim() || "#C40000",
        onClick: setIsShowModal => deleteChatClickHandler(setIsShowModal)
    }
];
