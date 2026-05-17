import type {NavigateFunction} from "react-router-dom";

/**
 * Переходит на страницу профиля автора после подтверждения удаления альбома.
 *
 * @param navigate - Функция навигации React Router.
 * @param userULID - Уникальный идентификатор пользователя.
 */
export function confirmDeletePost(navigate: NavigateFunction, userULID: string) {
    navigate(`/profile/${userULID}`);
}
