import {closeButtonClickHandler} from "./closeButtonClickHandler";
import React from "react";

/**
 * Подтверждает добавление постов в альбом: закрывает модальное окно и сбрасывает выбор.
 *
 * @param setIsDisappearring - Сеттер анимации закрытия модального окна.
 * @param transitionTime - Длительность анимации закрытия в миллисекундах.
 * @param setIsShowModal - Сеттер видимости модального окна.
 * @param setSelectedPosts - Сеттер списка выбранных публикаций.
 */
export function addAlbumsClickHandler(
    setIsDisappearring: React.Dispatch<React.SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>
) {
    closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal, setSelectedPosts);
}
