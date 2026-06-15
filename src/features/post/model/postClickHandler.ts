import type {NavigateFunction} from "react-router-dom";

/**
 * Переходит на страницу детального просмотра поста.
 *
 * @param navigate - Функция навигации React Router.
 * @param UUID - Уникальный идентификатор поста.
 */
export function postClickHandler(navigate: NavigateFunction, UUID: string) {
    navigate(`/post/${UUID}`);
}
