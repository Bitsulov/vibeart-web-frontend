import React from "react";

/**
 * Раскрывает описание профиля.
 *
 * @param setIsOpened - Сеттер состояния раскрытия описания.
 */
export function openDescriptionHandler(
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsOpened(true);
}
