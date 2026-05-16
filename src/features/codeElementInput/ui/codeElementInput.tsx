import c from "./codeElementInput.module.scss";
import type {ChangeEventHandler, ComponentProps, Dispatch, SetStateAction} from "react";
import {onChangeHandler} from "../model/onChangeHandler";
import clsx from "clsx";

interface CodeElementInputProps extends ComponentProps<"input"> {
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    className?: string;
    isError: boolean;
}

/**
 * Одна ячейка кода подтверждения: принимает только одну цифру,
 * управляется через внешний setValue.
 *
 * @param value - Текущее значение ячейки.
 * @param setValue - Обновляет значение в родительском состоянии.
 * @param onChange - Дополнительный обработчик onChange (например, для перехода к следующей ячейке).
 * @param isError - Подсвечивает ячейку красным, если она пустая при ошибке.
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
