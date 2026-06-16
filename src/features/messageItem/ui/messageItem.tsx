import c from "./messageItem.module.scss";
import clsx from "clsx";
import { statusesConfig } from "../config/statusesConfig";
import React from "react";

/** Свойства компонента {@link MessageItem}. */
interface MessageItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Признак принадлежности сообщения текущему пользователю. Влияет на сторону выравнивания. */
    isYour: boolean;
    /** Текст сообщения. */
    text: string;
    /** Дата отправки в формате ISO 8601. Из неё извлекаются часы и минуты для отображения. */
    date: string;
    /** Признак нового входящего сообщения. При `true` применяется CSS-анимация появления. */
    isNew?: boolean;
    /**
     * Статус доставки:
     * - `"save"` — сохранено локально, ещё не отправлено на сервер.
     * - `"sent"` — доставлено на сервер, не прочитано собеседником.
     * - `"read"` — прочитано собеседником.
     */
    status: "save" | "sent" | "read";
}

/**
 * Отдельное сообщение в ленте диалога.
 *
 * Выравнивается по правому краю для исходящих сообщений и по левому
 * для входящих. Для исходящих сообщений отображает иконку статуса
 * доставки из {@link statusesConfig}.
 */
export const MessageItem = ({
    isYour,
    text,
    date,
    status,
    isNew,
    ...props
}: MessageItemProps) => {
    const dateObject = new Date(date);
    const time = `${dateObject.getHours().toString().padStart(2, "0")}:${dateObject.getMinutes().toString().padStart(2, "0")}`;

    const StatusIcon = statusesConfig[status];

    return (
        <div
            className={clsx(c.message, isYour && c.your, isYour && isNew && c.new)}
            {...props}
        >
            <p className={c.text}>{text}</p>
            <div className={c.info}>
                {isYour && (
                    <StatusIcon
                        className={c.icon}
                        strokeWidth="2"
                        width="13"
                        height="13"
                    />
                )}
                <p className={c.time}>{time}</p>
            </div>
        </div>
    );
};
