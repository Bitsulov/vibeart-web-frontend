import React from "react";

/**
 * Предотвращает закрытие модального окна при клике внутри неё.
 *
 * @param e - Событие клика мыши.
 */
export function modalClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
}
