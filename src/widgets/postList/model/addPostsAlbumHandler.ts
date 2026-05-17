import React from "react";

/**
 * Открывает модальное окно добавления постов в альбом.
 *
 * @param setIsShowAlbumModal - Сеттер видимости модального окна альбома.
 */
export function addPostsAlbumHandler(setIsShowAlbumModal: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShowAlbumModal(true);
}
