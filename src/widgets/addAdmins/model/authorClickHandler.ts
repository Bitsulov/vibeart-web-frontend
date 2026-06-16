import type { MouseEvent } from "react";

/**
 * Блокирует переход по ссылке при клике на карточку автора сообщества.
 *
 * Автор всегда является администратором и не может быть убран из списка,
 * поэтому клик не должен переключать его статус выбора.
 *
 * @param e - Событие клика мыши.
 */
export function authorClickHandler(e: MouseEvent) {
    e.preventDefault();
}
