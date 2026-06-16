import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppConfigType, ServerStatusType } from "../lib/types";

const initialState: AppConfigType = {
    currentLanguage: "ru",
    serverStatus: "good",
    unreadChatsCount: 0,
    unreadNotificationsCount: 0
};

/**
 * Redux-слайс для управления глобальной конфигурацией приложения.
 *
 * Начальное состояние: язык `"ru"`, сервер `"good"`, счётчики равны `0`.
 * Данные обновляются провайдером инициализации при старте приложения.
 */
export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        /**
         * Устанавливает код активной локали интерфейса.
         *
         * @param action.payload - Код языка по стандарту BCP 47 (например, `"ru"`, `"en"`).
         */
        setLanguage(state, action) {
            state.currentLanguage = action.payload;
        },

        /**
         * Устанавливает текущее состояние серверного API.
         *
         * @param action.payload - Статус: `"good"`, `"problem"` или `"bad"`.
         */
        setServerStatus(state, action: PayloadAction<ServerStatusType>) {
            state.serverStatus = action.payload;
        },

        /**
         * Устанавливает количество диалогов с непрочитанными сообщениями.
         *
         * @param action.payload - Актуальное количество непрочитанных диалогов.
         */
        setUnreadChatsCount(state, action: PayloadAction<number>) {
            state.unreadChatsCount = action.payload;
        },

        /**
         * Устанавливает количество непрочитанных уведомлений.
         *
         * @param action.payload - Актуальное количество непрочитанных уведомлений.
         */
        setUnreadNotificationsCount(state, action: PayloadAction<number>) {
            state.unreadNotificationsCount = action.payload;
        }
    }
});

export const {
    setLanguage,
    setServerStatus,
    setUnreadNotificationsCount,
    setUnreadChatsCount
} = appSlice.actions;

export const appReducer = appSlice.reducer;
