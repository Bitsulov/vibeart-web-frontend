import type {ChangeEvent, Dispatch, SetStateAction} from "react";

/**
 * Обновляет строку поиска при вводе в поле.
 *
 * @param e - Событие изменения текстового поля.
 * @param setValue - Сеттер строки поиска.
 */
export function changeSearchHandler(e: ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<string>>) {
    setValue(e.target.value);
}
