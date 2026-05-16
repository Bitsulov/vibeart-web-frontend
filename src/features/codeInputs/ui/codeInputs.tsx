import c from "./codeInputs.module.scss";
import {CodeElementInput} from "features/codeElementInput";
import {type ComponentPropsWithoutRef, useEffect, useRef, useState} from "react";
import {changeInputHandler} from "../model/changeInputHandler";
import {keyDownHandler} from "../model/keyDownHandler";

interface CodeInputsProps extends ComponentPropsWithoutRef<"div"> {
    className?: string;
    setCode: (value: string) => void;
    isError: boolean;
}

/**
 * Поле ввода 6-значного кода подтверждения: шесть отдельных ячеек
 * с автопереходом вперёд при вводе и назад при нажатии Backspace.
 *
 * @param setCode - Вызывается при изменении кода, передаёт строку из 6 символов.
 * @param isError - Подсвечивает пустые ячейки при ошибке.
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
