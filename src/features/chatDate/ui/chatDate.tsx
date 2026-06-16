import c from "./chatDate.module.scss";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";
import { getResultDay } from "../lib/getResultDay";
import { useTranslation } from "react-i18next";
import React from "react";

/** Свойства компонента {@link ChatDate}. */
interface ChatDateProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Дата в формате ISO 8601. Форматируется в читаемый вид с учётом языка интерфейса. */
    date: string;
}

/**
 * Разделитель даты в ленте сообщений чата.
 *
 * Отображает отформатированную дату между группами сообщений.
 * Формат зависит от текущего языка интерфейса и вычисляется через {@link getResultDay}.
 */
export const ChatDate = ({ date, ...props }: ChatDateProps) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);

    return (
        <div className={c.date} {...props}>
            <p className={c.text}>{getResultDay(t, currentLanguage, date)}</p>
        </div>
    );
};
