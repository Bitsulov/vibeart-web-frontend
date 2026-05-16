import React, {type Dispatch, type SetStateAction} from "react";
import type {UserType} from "entities/user";

/**
 * Обрабатывает выбор файла: создаёт ObjectURL для предпросмотра и сохраняет файл.
 *
 * @param e - Событие изменения input[type=file].
 * @param setEntityInfo - Сеттер состояния сущности для записи avatarUrl.
 * @param setLoadedFile - Сеттер загруженного файла.
 * @returns Выбранный файл или null.
 */
export function onChangeAvatarLoadHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setEntityInfo: Dispatch<SetStateAction<Partial<UserType>>>,
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>
) {
    const file = e.target.files?.[0];

    if(file) {
        setEntityInfo(entity => ({...entity, avatarUrl: URL.createObjectURL(file)}));
        setLoadedFile?.(file);
    }

    return file ?? null;
}
