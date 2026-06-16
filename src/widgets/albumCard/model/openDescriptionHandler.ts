import type { Dispatch, SetStateAction } from "react";

/**
 * Раскрывает описание альбома.
 *
 * @param setIsOpened - Сеттер состояния раскрытия описания.
 */
export const openDescriptionHandler = (
    setIsOpened: Dispatch<SetStateAction<boolean>>
) => {
    setIsOpened(true);
};
