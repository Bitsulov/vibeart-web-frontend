import type {NavigateFunction} from "react-router-dom";

/**
 * Переходит в галерею после подтверждения создания альбома без обложки.
 *
 * @param navigate - Функция навигации React Router.
 */
export function confirmModalHandler(navigate: NavigateFunction) {
    navigate("/gallery", {replace: true});
}
