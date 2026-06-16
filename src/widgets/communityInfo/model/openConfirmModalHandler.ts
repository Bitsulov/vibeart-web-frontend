import React from "react";

/**
 * Открывает модальное окно подтверждения действия.
 *
 * @param setIsShow - Сеттер видимости модального окна подтверждения.
 */
export function openConfirmModalHandler(
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsShow(true);
}
