import React from "react";

/**
 * Выполняет подтверждённое действие с анимацией закрытия модального окна.
 *
 * @param func - Колбэк, вызываемый после завершения анимации.
 * @param setIsDisappearring - Сеттер анимации закрытия модального окна.
 * @param transitionTime - Длительность анимации закрытия в миллисекундах.
 * @param setIsShowChangeLanguage - Сеттер видимости модального окна.
 */
export function agreeHandlerClick(
    func: () => void,
    setIsDisappearring: React.Dispatch<React.SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsDisappearring(true);
    setTimeout(() => {
        setIsShowChangeLanguage(false);
        setIsDisappearring(false);
        func();
    }, transitionTime);
}
