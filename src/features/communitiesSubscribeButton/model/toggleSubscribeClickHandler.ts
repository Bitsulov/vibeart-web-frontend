import React from "react";

/**
 * Переключает состояние подписки на противоположное.
 * @param setIsSubscribed - Сеттер состояния подписки.
 */
export function toggleSubscribeClickHandler(
    setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsSubscribed(state => !state);
}
