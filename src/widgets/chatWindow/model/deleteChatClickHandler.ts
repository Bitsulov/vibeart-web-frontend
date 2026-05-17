import type { Dispatch, SetStateAction } from "react";

/**
 * Открывает модальное окно подтверждения удаления чата.
 *
 * @param setIsShowModal - Сеттер видимости модального окна подтверждения.
 */
export function deleteChatClickHandler(setIsShowModal: Dispatch<SetStateAction<boolean>>) {
    setIsShowModal(true);
}
