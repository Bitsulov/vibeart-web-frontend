import type { Dispatch, SetStateAction } from "react";

/**
 * Закрывает модальное окно куки и сохраняет согласие пользователя
 * в куку `acceptedCookie` сроком на 1 год.
 *
 * @param setIsShow - сеттер видимости модального окна.
 */
export function closeModalHandler(setIsShow: Dispatch<SetStateAction<boolean>>) {
    document.cookie = "acceptedCookie=1; max-age=31536000; SameSite=Lax; path=/; Secure";
    setIsShow(false);
}
