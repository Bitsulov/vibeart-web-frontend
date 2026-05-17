import React from "react";

/**
 * Закрывает модальное окно смены языка с анимацией.
 *
 * @param setIsDisappearring - Сеттер анимации закрытия модального окна.
 * @param transitionTime - Длительность анимации закрытия в миллисекундах.
 * @param setIsShowChangeLanguage - Сеттер видимости модального окна.
 */
export function closeButtonClickHandler(
    setIsDisappearring: React.Dispatch<React.SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsDisappearring(true);
    setTimeout(() => {
        setIsShowChangeLanguage(false);
        setIsDisappearring(false);
    }, transitionTime);
}
