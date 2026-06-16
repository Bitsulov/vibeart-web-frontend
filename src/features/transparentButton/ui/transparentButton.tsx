import c from "./transparentButton.module.scss";
import type { ComponentPropsWithoutRef } from "react";

/** Свойства компонента {@link TransparentButton}. */
interface TransparentButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
}

/**
 * Вторичная кнопка с прозрачным фоном.
 *
 * Используется для действий меньшей приоритетности рядом с {@link StylizedButton}.
 * Обработчик `onClick` по умолчанию — пустая функция, что безопасно
 * при использовании без явного обработчика.
 */
export const TransparentButton = ({
    className,
    children,
    onClick = () => {},
    ariaLabel,
    ...props
}: TransparentButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${c.button} ${className}`}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
};
