import React from "react";

/**
 * Закрывает модальное окно альбома с анимацией и сбрасывает список выбранных постов.
 *
 * @param setIsDisappearring - Сеттер анимации закрытия модального окна.
 * @param transitionTime - Длительность анимации закрытия в миллисекундах.
 * @param setIsShowChangeLanguage - Сеттер видимости модального окна.
 * @param setSelectedPosts - Сеттер списка выбранных публикаций.
 */
export function closeButtonClickHandler(
    setIsDisappearring: React.Dispatch<React.SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>,
) {
    setIsDisappearring(true);
    setTimeout(() => {
        setIsShowChangeLanguage(false);
        setIsDisappearring(false);
        setSelectedPosts([]);
    }, transitionTime);
}
