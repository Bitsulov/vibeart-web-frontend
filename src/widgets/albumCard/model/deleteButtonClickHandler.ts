import React from "react";

/**
 * Открывает модальное окно подтверждения удаления альбома.
 *
 * @param setIsShowModal - Сеттер видимости модального окна подтверждения.
 */
export function deleteButtonClickHandler(
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsShowModal(true);
}
