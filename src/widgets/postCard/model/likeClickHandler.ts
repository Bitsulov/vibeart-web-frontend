import React from "react";

/**
 * Переключает лайк и изменяет счётчик.
 *
 * @param setLikes - Сеттер количества лайков.
 * @param isLiked - Текущее состояние лайка.
 * @param setIsLiked - Сеттер состояния лайка.
 */
export function likeClickHandler(
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    isLiked: boolean,
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsLiked(!isLiked);
    setLikes(likes => (isLiked ? likes - 1 : likes + 1));
}
