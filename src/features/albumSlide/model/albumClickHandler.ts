import React from "react";

/**
 * Устанавливает выбранный альбом по UUID.
 *
 * @param setSelectedAlbum - Сеттер состояния выбранного альбома.
 * @param UUID - Уникальный идентификатор альбома.
 */
export function albumClickHandler(setSelectedAlbum: React.Dispatch<React.SetStateAction<string>>, UUID: string) {
    setSelectedAlbum(UUID);
}
