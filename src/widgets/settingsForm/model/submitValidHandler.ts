import type { UseFormSetValue } from "react-hook-form";
import type { ISettingsForm } from "../lib/types";

/**
 * Сбрасывает все поля формы настроек после успешной отправки.
 *
 * @param setValue - Сеттер значений полей формы.
 */
export function submitValidHandler(setValue: UseFormSetValue<ISettingsForm>) {
    setValue("avatar", "");
    setValue("title", "");
    setValue("description", "");
    setValue("id", "");
}
