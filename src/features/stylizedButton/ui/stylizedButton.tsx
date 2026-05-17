import c from "./stylizedButton.module.scss";
import type { ComponentPropsWithoutRef } from "react";

/** Свойства компонента {@link StylizedButton}. */
interface StylizedButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
}

/**
 * Основная кнопка приложения с особым стилем.
 *
 * Расширяет стандартный элемент `<button>`, добавляя базовый класс стилей
 * и поддержку произвольных дополнительных классов через `className`.
 * Тип по умолчанию — `"button"` (предотвращает случайную отправку формы).
 */
export const StylizedButton = ({
    className,
    onClick,
    children,
    ariaLabel,
    type = "button",
    ...props
}: StylizedButtonProps) => {
    const buttonClassName = className ? `${c.button} ${className}` : c.button;

	return (
		<button aria-label={ariaLabel} type={type} onClick={onClick} className={buttonClassName} {...props}>
            {children}
		</button>
	)
}
