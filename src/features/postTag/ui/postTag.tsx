import c from "./postTag.module.scss";
import type {TagType} from "entities/tag";
import React from "react";

/** Свойства компонента {@link PostTag}. */
interface PostTagProps extends React.HTMLAttributes<HTMLSpanElement | HTMLButtonElement> {
    /** Объект тега с идентификатором и названием. */
    tag: TagType;
    /**
     * Режим отображения:
     * - `"default"` — статичный тег в виде `<span>`.
     * - `"button"` — интерактивный тег в виде `<button>` с обработчиком `onClick`.
     */
    type?: "default" | "button";
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Обработчик нажатия для режима `"button"` (например, добавление тега в фильтр). */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** Метка доступности кнопки тега для программ чтения с экрана (режим `"button"`). */
    ariaLabel?: string;
}

/**
 * Тег публикации в формате `#название`.
 *
 * В режиме `"default"` отрисовывается как статичный элемент,
 * в режиме `"button"` — как интерактивная кнопка для фильтрации по тегу.
 */
export const PostTag = ({
    tag,
    type = "default",
    className = "",
    onClick = () => {},
    ariaLabel = "",
    ...props
}: PostTagProps) => {
    return (
        <>
            {type === "default" &&
                <span className={`${c.tag} ${className}`} {...props}>#{tag.title}</span>
            }
            {type === "button" &&
                <button
                    aria-label={ariaLabel}
                    onClick={onClick}
                    className={`${c.tag} ${c.button} ${className}`}
                    type="button"
                    {...props}
                >
                    #{tag.title}
                </button>
            }
        </>
    );
};
