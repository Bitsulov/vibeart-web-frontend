import React from "react";

/**
 * Отправляет жалобу на пост — однократное действие, повторная отправка игнорируется.
 *
 * @param isReported - Признак того, что жалоба уже была отправлена.
 * @param setIsReported - Сеттер состояния отправки жалобы.
 */
export function reportClickHandler(
    isReported: boolean,
    setIsReported: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (!isReported) {
        setIsReported(true);
    }
}
