import type {NavigateFunction} from "react-router-dom";

/**
 * Перенаправляет на список чатов после подтверждения удаления.
 *
 * @param navigate - Функция навигации React Router.
 */
export function deleteChatConfirmClickHandler(navigate: NavigateFunction) {
    navigate("/chats", { replace: true });
}
