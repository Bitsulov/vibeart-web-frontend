import type { MouseEvent } from "react";

/**
 * Предотвращает переход по ссылке при клике на выпадающее меню.
 *
 * Выпадающее меню расположено внутри элемента `<Link>`, поэтому клик
 * по его пунктам вызвал бы навигацию. `preventDefault` блокирует это.
 *
 * @param e - Событие клика мыши.
 */
export function dropdownClickHandler(e: MouseEvent) {
    e.preventDefault();
}
