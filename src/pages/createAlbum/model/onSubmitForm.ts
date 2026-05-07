import type {Dispatch, SetStateAction} from "react";

/**
 * Проверяет наличие загруженного файла и устанавливает флаг ошибки изображения.
 *
 * @param file - Загруженный файл обложки альбома.
 * @param setIsErrorImg - Сеттер флага ошибки изображения.
 */
export function onSubmitForm(file: File | undefined, setIsErrorImg: Dispatch<SetStateAction<boolean>>) {
    if(!file) {
        setIsErrorImg(true);
    } else {
        setIsErrorImg(false);
    }
}
