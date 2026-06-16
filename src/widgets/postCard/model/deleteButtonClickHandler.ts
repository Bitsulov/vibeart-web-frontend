import React from "react";

/**
 * Открывает модальное окно подтверждения удаления поста.
 *
 * @param setIsShowModal - Сеттер видимости модального окна подтверждения.
 */
export function deleteButtonClickHandler(
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsShowModal(true);
}
