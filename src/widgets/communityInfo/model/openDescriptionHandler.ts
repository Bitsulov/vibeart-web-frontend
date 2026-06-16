import React from "react";

/**
 * Раскрывает описание профиля.
 *
 * @param setIsOpenedModal - Сеттер состояния раскрытия описания.
 */
export function openDescriptionHandler(
    setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsOpenedModal(true);
}
