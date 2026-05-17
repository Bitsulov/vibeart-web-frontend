import React from "react";

/**
 * Обновляет значение поиска при вводе в поле.
 *
 * @param e - Событие изменения поля ввода.
 * @param setSearchValue - Сеттер строки поиска.
 */
export function searchHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
) {
    setSearchValue(e.target.value);
}
