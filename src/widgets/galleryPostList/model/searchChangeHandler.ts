import React from "react";

/**
 * Обновляет значение поиска при вводе в поле.
 *
 * @param e - Событие изменения поля ввода.
 * @param setValue - Сеттер строки поиска.
 */
export function searchChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
) {
    setValue(e.target.value);
}
