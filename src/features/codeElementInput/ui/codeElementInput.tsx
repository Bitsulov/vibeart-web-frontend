import c from "./codeElementInput.module.scss";
import type {ChangeEventHandler, ComponentProps, Dispatch, SetStateAction} from "react";
import {onChangeHandler} from "../model/onChangeHandler";
import clsx from "clsx";

/** Свойства компонента {@link CodeElementInput}. */
interface CodeElementInputProps extends ComponentProps<"input"> {
    /** Дополнительный обработчик изменения значения. */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /** Текущее значение ячейки (одна цифра). */
    value: string;
    /** Функция обновления значения в состоянии родительского компонента. */
    setValue: Dispatch<SetStateAction<string>>;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Признак ошибки валидации. При `true` и пустом значении подсвечивает ячейку красным. */
    isError: boolean;
}

/**
 * Одна ячейка поля ввода кода подтверждения.
 *
 * Принимает ровно одну цифру. Внутренний обработчик передаёт значение
 * в `setValue`, а внешний `onChange` позволяет родителю перемещать фокус
 * между ячейками.
 */
export const CodeElementInput = ({
    value,
    setValue,
    onChange = () => {},
    className = "",
    isError = false,
    ...props
}: CodeElementInputProps) => {
	return (
		<input
            value={value}
            inputMode="numeric"
            onChange={(e) => onChangeHandler(e, setValue, onChange)}
            maxLength={1}
            className={clsx(c.input, className, isError && !value && c.error)}
            {...props}
        />
	)
}
