import type { Dispatch, SetStateAction } from "react";

/**
 * Открывает выпадающее меню при наведении курсора на кнопку профиля.
 *
 * @param setIsOpen - Установщик состояния видимости выпадающего меню.
 */
export function buttonMouseEnterHandler(setIsOpen: Dispatch<SetStateAction<boolean>>) {
    setIsOpen(true);
}
