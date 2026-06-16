import type { Dispatch, SetStateAction } from "react";

/**
 * Открывает модальное окно подтверждения создания альбома без обложки.
 *
 * @param setIsShowModal - Функция обновления признака видимости модального окна.
 */
export function openModalHandler(setIsShowModal: Dispatch<SetStateAction<boolean>>) {
    setIsShowModal(true);
}
