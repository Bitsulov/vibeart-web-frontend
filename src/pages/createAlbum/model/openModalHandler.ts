import type {Dispatch, SetStateAction} from "react";

export function openModalHandler(setIsShowModal: Dispatch<SetStateAction<boolean>>) {
    setIsShowModal(true);
}
