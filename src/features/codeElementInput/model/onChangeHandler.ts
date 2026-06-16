import type { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react";

/**
 * Обновляет значение ячейки кода, если введён ровно один цифровой символ.
 *
 * @param e - Событие изменения input.
 * @param setValue - Сеттер значения ячейки.
 * @param onChange - Внешний обработчик onChange из родительского компонента.
 */
export function onChangeHandler(
    e: ChangeEvent<HTMLInputElement>,
    setValue: Dispatch<SetStateAction<string>>,
    onChange: ChangeEventHandler<HTMLInputElement>
) {
    if (/^\d$/.test(e.target.value)) {
        setValue(e.target.value);
        onChange(e);
    }
}
