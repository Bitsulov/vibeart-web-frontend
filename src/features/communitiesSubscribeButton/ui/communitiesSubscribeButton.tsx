import c from "./communitiesSubscribeButton.module.scss";
import { useTranslation } from "react-i18next";
import React, { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { toggleSubscribeClickHandler } from "../model/toggleSubscribeClickHandler";

/** Свойства компонента {@link CommunitiesSubscribeButton}. */
interface CommunitiesSubscribeButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** Текущее состояние подписки. Определяет текст кнопки и визуальный стиль. */
    isSubscribed: boolean;
    /** Функция обновления состояния подписки. */
    setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
}

/**
 * Кнопка подписки и отписки на сообщество.
 *
 * Текст меняется в зависимости от `isSubscribed`. Состояние обновляется
 * локально оптимистично — без ожидания ответа сервера.
 */
export const CommunitiesSubscribeButton = ({
    isSubscribed,
    setIsSubscribed,
    className = "",
    ...props
}: CommunitiesSubscribeButtonProps) => {
    const { t } = useTranslation();

    const text = isSubscribed ? "unscribe" : "subscribe";

    return (
        <button
            onClick={() => toggleSubscribeClickHandler(setIsSubscribed)}
            className={clsx(c.button, isSubscribed && c.subscribed, className)}
            {...props}
        >
            {t(text)}
        </button>
    );
};
