import c from "./codeInputs.module.scss";
import {CodeElementInput} from "features/codeElementInput";
import {type ComponentPropsWithoutRef, useEffect, useRef, useState} from "react";
import {changeInputHandler} from "../model/changeInputHandler";
import {keyDownHandler} from "../model/keyDownHandler";

/** Свойства компонента {@link CodeInputs}. */
interface CodeInputsProps extends ComponentPropsWithoutRef<"div"> {
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Вызывается при каждом изменении кода. Получает строку из 6 символов (может содержать пустые позиции). */
    setCode: (value: string) => void;
    /** Признак ошибки валидации. При `true` пустые ячейки подсвечиваются красным. */
    isError: boolean;
}

/**
 * Поле ввода шестизначного кода подтверждения.
 *
 * Состоит из шести отдельных ячеек {@link CodeElementInput}. При вводе
 * символа фокус автоматически переходит к следующей ячейке, при нажатии
 * Backspace — к предыдущей. Итоговый код передаётся в `setCode` после
 * каждого изменения.
 */
export const CodeInputs = ({
    setCode,
    className = "",
    isError = false,
    ...props
}: CodeInputsProps) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [values, setValues] = useState<string[]>(Array.from({ length: 6 }, () => ""));

    useEffect(() => {
        setCode(values.join(""));
    }, [values, setCode]);

	return (
		<div className={`${c.wrapper} ${className}`} {...props}>
            {Array.from({ length: 6 }, (_, i) =>
                <CodeElementInput
                    isError={isError}
                    key={i}
                    onChange={(e) => changeInputHandler(e, inputsRef, i)}
                    onKeyDown={e =>
                        keyDownHandler(
                            e,
                            inputsRef,
                            i,
                            (val) => setValues(prev => {
                                const next = [...prev];
                                next[i] = typeof val === "function" ? val(prev[i]) : val;
                                return next;
                            })
                        )}
                    value={values[i]}
                    setValue={(val) =>
                        setValues(prev => {
                            const next = [...prev];
                            next[i] = typeof val === "function" ? val(prev[i]) : val;
                            return next;
                        })
                    }
                    ref={(el) => {
                        inputsRef.current[i] = el;
                    }}
                />
            )}
		</div>
	)
}
