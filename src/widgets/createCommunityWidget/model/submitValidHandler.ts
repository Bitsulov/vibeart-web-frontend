import type { UseFormSetValue } from "react-hook-form";
import type { ICreateCommunityForm } from "../lib/types";

/**
 * Сбрасывает все поля формы создания сообщества после успешной отправки.
 *
 * @param setValue - Сеттер значений полей формы.
 */
export function submitValidHandler(setValue: UseFormSetValue<ICreateCommunityForm>) {
    setValue("avatar", "");
    setValue("title", "");
    setValue("description", "");
    setValue("id", "");
}
