import c from "./checkbox.module.scss";
import type {ReactNode} from "react";
import clsx from "clsx";

/** Свойства компонента {@link Checkbox}. */
interface CheckboxProps {
    /** Значение атрибута `id` элемента `<input>`. Связывает его с `<label>`. */
    id: string;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Содержимое метки, отображаемое рядом с чекбоксом. */
    children: string | ReactNode;
    /** Признак ошибки валидации. При `true` рамка чекбокса становится красной. */
    isError: boolean;
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
    /** Значение `id` элемента, описывающего поле (используется в `aria-describedby`). */
    describedId?: string;
    /** Значение атрибута `name` элемента `<input>` для привязки к форме. */
    name: string;
}

/**
 * Стилизованный чекбокс с поддержкой валидации и доступности.
 *
 * Нативный `<input type="checkbox">` скрыт, а вместо него отображается
 * кастомный элемент `<span>`, управляемый через CSS. Это позволяет
 * применять произвольные стили, сохраняя полную доступность через
 * атрибуты `aria-invalid` и `aria-describedby`.
 */
export const Checkbox = ({ name, describedId, ariaLabel, id, className = "", children, isError, ...props }: CheckboxProps) => {
	return (
        <label className={`${c.wrapper} ${className}`} htmlFor={id} {...props}>
            <input
                aria-label={ariaLabel}
                aria-invalid={isError ? "true" : "false"}
                aria-describedby={describedId}
                id={id}
                className={c.input}
                type="checkbox"
                name={name}
            />
            <span className={clsx(c.custom_box, isError && c.error)} aria-hidden="true"></span>
            <span className={c.text}>{children}</span>
        </label>
	)
}
