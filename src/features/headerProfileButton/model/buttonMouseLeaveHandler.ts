import type { Dispatch, SetStateAction } from "react";

/**
 * Закрывает выпадающее меню при уходе курсора с кнопки профиля.
 *
 * @param setIsOpen - Установщик состояния видимости выпадающего меню.
 */
export function buttonMouseLeaveHandler(setIsOpen: Dispatch<SetStateAction<boolean>>) {
    setIsOpen(false);
}
