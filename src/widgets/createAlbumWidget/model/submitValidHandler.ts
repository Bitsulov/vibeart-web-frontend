import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import type { Dispatch as ReactDispatch, SetStateAction } from "react";
// import {showToast} from "features/toast";

/**
 * Обрабатывает валидную отправку формы создания альбома.
 * Передаёт в onSubmit функцию навигации в галерею.
 *
 * @param navigate - Функция навигации React Router.
 * @param _dispatch - Redux dispatch (зарезервирован для будущей логики).
 * @param _loadedFile - Загруженный файл обложки (зарезервирован для будущей логики).
 * @param _setIsErrorImg - Сеттер флага ошибки изображения (зарезервирован).
 * @param onSubmit - Callback, получающий функцию навигации и решающий когда её вызвать.
 */
export function submitValidHandler(
    navigate: NavigateFunction,
    _dispatch: Dispatch,
    _loadedFile: File | undefined,
    _setIsErrorImg: ReactDispatch<SetStateAction<boolean>>,
    onSubmit: (navigation: () => void) => void
) {
    // if(_loadedFile) {
    //     navigate("/gallery", {replace: true});
    // } else {
    //     _dispatch(showToast({message: "toast.loadImg", type: "error"}));
    //     setIsErrorImg(true);
    // }
    onSubmit(() => navigate("/gallery", { replace: true }));
}
