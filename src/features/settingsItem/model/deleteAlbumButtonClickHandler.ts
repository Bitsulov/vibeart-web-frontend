import type {Dispatch, RefObject, SetStateAction} from "react";
import type {UserType} from "entities/user";

/**
 * Очищает input файла и сбрасывает imageUrl и загруженный файл.
 *
 * @param inputLoadRef - Ref скрытого input[type=file].
 * @param setEntityInfo - Сеттер состояния сущности для сброса avatarUrl.
 * @param setLoadedFile - Сеттер загруженного файла.
 */
export function deleteAlbumButtonClickHandler(
    inputLoadRef: RefObject<HTMLInputElement | null>,
    setEntityInfo: Dispatch<SetStateAction<Partial<UserType>>>,
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>
) {
    if(inputLoadRef.current) {
        inputLoadRef.current.value = "";
        setEntityInfo(entity => ({...entity, avatarUrl: ""}))
        setLoadedFile?.(undefined);
    }
}
