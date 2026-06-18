import type { Dispatch, RefObject, SetStateAction } from "react";

/**
 * Очищает input файла и сбрасывает imageUrl и загруженный файл.
 *
 * @param inputLoadRef - Ref скрытого input[type=file].
 * @param setEntityInfo - Сеттер состояния сущности для сброса imageUrl.
 * @param setLoadedFile - Сеттер загруженного файла.
 */
export function deleteButtonClickHandler<T extends object>(
    inputLoadRef: RefObject<HTMLInputElement | null>,
    setEntityInfo: Dispatch<SetStateAction<T>>,
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>
) {
    if (inputLoadRef.current) {
        inputLoadRef.current.value = "";
        setEntityInfo(entity => ({ ...entity, imageUrl: "" }) as T);
        setLoadedFile?.(undefined);
    }
}
