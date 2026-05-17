import c from "./statItem.module.scss";
import type {LucideIcon} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";
import {getShortNumber} from "shared/lib/getShortNumber";

/** Свойства компонента {@link StatItem}. */
interface StatItemProps {
    /**
     * Режим отображения:
     * - `"default"` — статичный блок без интерактивности.
     * - `"link"` — навигационная ссылка, принимает `href`.
     * - `"button"` — интерактивная кнопка, принимает `onClick`.
     */
    type?: "link" | "button" | "default";
    /** Путь назначения для режима `"link"`. */
    href?: string;
    /** Обработчик нажатия для режима `"button"`. */
    onClick?: React.MouseEventHandler;
    /** Обработчик наведения курсора. */
    onMouseEnter?: React.MouseEventHandler;
    /** Обработчик ухода курсора. */
    onMouseLeave?: React.MouseEventHandler;
    /** Текстовое описание для программ чтения с экрана (режимы `"link"` и `"button"`). */
    ariaLabel?: string;
    /** Иконка из библиотеки Lucide, отображаемая рядом с числом. */
    Icon: LucideIcon;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Дополнительный CSS-класс для иконки. */
    iconClassName?: string;
    /** Толщина обводки иконки. По умолчанию `2`. */
    strokeWidth?: number;
    /**
     * Числовое значение статистики.
     * Форматируется через {@link getShortNumber} (например, 1 500 000 → «1.5M»).
     */
    number: number | string;
}

/**
 * Элемент статистики: иконка и компактное числовое значение.
 *
 * В зависимости от `type` отрисовывается как статичный блок (`div`),
 * навигационная ссылка (`<Link>`) или кнопка (`<button>`).
 * Число форматируется в компактную нотацию через {@link getShortNumber}.
 */
export const StatItem = ({
    type = "default",
    href = "",
    onClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    Icon,
    className = "",
    iconClassName = "",
    strokeWidth = 2,
    number = 0,
    ...props
}: StatItemProps) => {
	return (
        <>
            {type === "default" && (
                <div
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    className={`${c.stat_wrapper} ${className}`}
                    {...props}
                >
                    <Icon strokeWidth={strokeWidth} className={`${c.stat_icon} ${iconClassName}`} width="24" height="24" />
                    <p className={c.number}>{getShortNumber(+number)}</p>
                </div>
            )}
            {type === "link" && (
                <Link
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    aria-label={ariaLabel}
                    to={href}
                    className={`${c.stat_wrapper} ${className}`}
                    {...props}
                >
                    <Icon strokeWidth={strokeWidth} className={`${c.stat_icon} ${iconClassName}`} width="24" height="24" />
                    <p className={c.number}>{getShortNumber(+number)}</p>
                </Link>
            )}
            {type === "button" && (
                <button
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    aria-label={ariaLabel}
                    onClick={onClick}
                    className={`${c.stat_wrapper} ${className}`}
                    {...props}
                >
                    <Icon strokeWidth={strokeWidth} className={`${c.stat_icon} ${iconClassName}`} width="24" height="24" />
                    <p className={c.number}>{getShortNumber(+number)}</p>
                </button>
            )}
        </>
	)
}
