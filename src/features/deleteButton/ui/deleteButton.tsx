import c from "./deleteButton.module.scss";
import { Trash2 } from "lucide-react";
import React from "react";

/** Свойства компонента {@link DeleteButton}. */
interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
}

/**
 * Кнопка удаления с иконкой корзины.
 *
 * Универсальный компонент для действий удаления. Обработчики наведения
 * и нажатия по умолчанию — пустые функции, что безопасно при
 * использовании без явных обработчиков.
 */
export const DeleteButton = ({
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    onClick = () => {},
    className = "",
    ...props
}: DeleteButtonProps) => {
    return (
        <button
            className={`${c.button} ${className}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={ariaLabel}
            {...props}
        >
            <Trash2 className={c.icon} />
        </button>
    );
};
