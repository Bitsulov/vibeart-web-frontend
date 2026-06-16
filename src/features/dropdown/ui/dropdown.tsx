import c from "./dropdown.module.scss";
import type { LucideIcon } from "lucide-react";
import React from "react";
import clsx from "clsx";
import { optionClickHandler } from "../model/optionClickHandler";

/** Свойства компонента {@link Dropdown}. */
interface DropdownProps extends React.HTMLAttributes<HTMLUListElement> {
    /**
     * Список пунктов меню. Каждый пункт содержит:
     * - `icon` — иконка из библиотеки Lucide.
     * - `text` — отображаемый текст пункта.
     * - `color` — CSS-цвет иконки и текста.
     * - `ariaLabel` — необязательная метка доступности кнопки пункта.
     * - `onClick` — обработчик выбора пункта.
     */
    options: {
        icon: LucideIcon;
        text: string;
        color: string;
        ariaLabel?: string;
        onClick: () => void;
    }[];
    /** Признак видимости меню. */
    isOpen: boolean;
    /** Функция обновления видимости меню. */
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    /** Идентификатор корневого элемента `<ul>`. Используется в `aria-controls` кнопки-триггера. */
    id: string;
}

/**
 * Выпадающее меню с настраиваемым набором пунктов.
 *
 * Список скрыт через атрибут `inert` при `isOpen === false`, что блокирует
 * взаимодействие с пунктами посредством клавиатуры и вспомогательных технологий.
 * После выбора пункта меню закрывается автоматически.
 */
export const Dropdown = ({
    id = "",
    isOpen,
    setIsOpen,
    options,
    className = "",
    ...props
}: DropdownProps) => {
    return (
        <ul
            id={id ? id : undefined}
            role="menu"
            className={clsx(c.drowdown, className, isOpen && c.open)}
            inert={!isOpen || undefined}
            {...props}
        >
            {options.map(option => {
                const Icon = option.icon;

                return (
                    <li key={option.text} role="menuitem" className={c.option}>
                        <button
                            onClick={() => optionClickHandler(option.onClick, setIsOpen)}
                            aria-label={option.ariaLabel ? option.ariaLabel : undefined}
                            className={c.button}
                            style={
                                {
                                    "--option-color": option.color,
                                    color: option.color
                                } as React.CSSProperties
                            }
                        >
                            <Icon
                                className={c.icon}
                                color={option.color || "currentColor"}
                            />
                            {option.text}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
