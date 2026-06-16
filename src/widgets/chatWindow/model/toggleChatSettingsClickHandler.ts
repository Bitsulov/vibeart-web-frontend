import React from "react";

/**
 * Переключает видимость выпадающего списка настроек чата.
 *
 * @param setIsOpenOptions - Сеттер состояния раскрытия списка настроек.
 */
export function toggleChatSettingsClickHandler(
    setIsOpenOptions: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsOpenOptions(state => !state);
}
