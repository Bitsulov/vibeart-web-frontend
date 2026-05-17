import type {IMessagesForm} from "../lib/types";
import React from "react";
import {createMessage, type MessageType} from "entities/message";
import type {UseFormSetValue} from "react-hook-form";

/**
 * Обрабатывает успешную отправку формы чата: добавляет сообщение в конец списка и сбрасывает поле ввода.
 *
 * @param data - Данные формы с текстом сообщения.
 * @param setMessages - Сеттер списка сообщений в диалоге.
 * @param setValue - Функция сброса поля формы (react-hook-form).
 */
export function submitValidHandler(
    data: IMessagesForm,
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
    setValue: UseFormSetValue<IMessagesForm>,
) {
    setMessages(messages => [
        ...messages,
        createMessage({id: Date.now(), text: data.sendMessage, createdAt: new Date().toISOString(), isYour: true, isNew: true, status: "save"})
    ]);
    setValue("sendMessage", "");
}
