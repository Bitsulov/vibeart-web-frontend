import React from "react";

/**
 * Скрывает подсказку и выполняет переданный обработчик нажатия.
 *
 * @param onClick - Основной обработчик нажатия кнопки.
 * @param onMouseLeave - Обработчик ухода курсора, скрывающий подсказку.
 * @param e - Событие мыши, передаваемое в `onMouseLeave`.
 */
export function clickHandler(onClick: () => void, onMouseLeave: React.MouseEventHandler, e: React.MouseEvent) {
    onMouseLeave(e);
    onClick();
}
