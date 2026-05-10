import type {Dispatch, SetStateAction} from "react";

/**
 * Обрабатывает отправку формы: если файл загружен — сбрасывает ошибку и перенаправляет на другую страницу,
 * иначе устанавливает флаг ошибки изображения.
 *
 * @param navigation - Функция навигации, вызывается при наличии файла.
 * @param file - Загруженный файл обложки альбома.
 * @param setIsErrorImg - Сеттер флага ошибки изображения.
 */
export function onSubmitForm(
    navigation: () => void,
    file: File | undefined,
    setIsErrorImg: Dispatch<SetStateAction<boolean>>
) {
    if(!file) {
        setIsErrorImg(true);
    } else {
        setIsErrorImg(false);
        navigation();
    }
}
