import type {Dispatch, SetStateAction} from "react";

/**
 * Раскрывает описание поста.
 *
 * @param setIsOpened - Сеттер состояния раскрытия описания.
 */
export const openDescriptionHandler = (setIsOpened: Dispatch<SetStateAction<boolean>>) => {
    setIsOpened(true);
};
