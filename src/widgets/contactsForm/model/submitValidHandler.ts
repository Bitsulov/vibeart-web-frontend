import type {UseFormSetValue} from "react-hook-form";
import type {IContactsForm} from "../lib/types";
import type {Dispatch} from "@reduxjs/toolkit";
import {showToast} from "features/toast";

/**
 * Обрабатывает успешную отправку формы связи с администрацией.
 *
 * Сбрасывает поле `text` и показывает уведомление об успешной отправке.
 *
 * @param setValue - Функция react-hook-form для сброса значения поля {@link IContactsForm}.
 * @param dispatch - Функция записи данных в Redux.
 */
export function submitValidHandler(setValue: UseFormSetValue<IContactsForm>, dispatch: Dispatch) {
    setValue("text", "");
    dispatch(showToast({message: "toast.reportSent", type: "success"}));
}
