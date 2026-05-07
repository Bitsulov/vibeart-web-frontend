import type {NavigateFunction} from "react-router-dom";
import type {Dispatch} from "@reduxjs/toolkit";
// import {showToast} from "features/toast";

/**
 * Обрабатывает валидную отправку формы создания альбома.
 * Переходит в галерею после успешной отправки.
 *
 * @param navigate - Функция навигации React Router.
 * @param _dispatch - Redux dispatch (зарезервирован для будущей логики).
 * @param _loadedFile - Загруженный файл обложки (зарезервирован для будущей логики).
 * @param onSubmit - Callback, вызываемый после попытки отправки.
 */
export function submitValidHandler(
    // data: ICreatePostForm,
    navigate: NavigateFunction,
    _dispatch: Dispatch,
    _loadedFile: File | undefined,
    onSubmit: () => void
) {
    navigate("/gallery", {replace: true});
    // if(_loadedFile) {
    //     navigate("/gallery", {replace: true});
    // } else {
    //     _dispatch(showToast({message: "toast.loadImg", type: "error"}));
    // }
    onSubmit();
}
