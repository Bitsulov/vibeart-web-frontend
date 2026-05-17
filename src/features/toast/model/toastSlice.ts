import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit";

/** Одно уведомление в очереди. */
export interface ToastItem {
    /** Уникальный идентификатор уведомления, генерируется автоматически. */
    id: string;
    /** Ключ локализации текста уведомления. */
    message: string;
    /**
     * Тип уведомления:
     * - `"success"` — успешное действие (зелёный).
     * - `"error"` — ошибка (красный).
     */
    type: "success" | "error";
}

/** Состояние Redux-слайса уведомлений. */
interface ToastState {
    /** Очередь уведомлений. Отображается первый элемент; остальные ждут своей очереди. */
    queue: ToastItem[];
}

const initialState: ToastState = {
    queue: [],
};

/**
 * Redux-слайс управления очередью уведомлений.
 *
 * `showToast` — добавляет уведомление в конец очереди, игнорируя дубликаты по `message` + `type`.
 * `hideToast` — удаляет первый элемент очереди (текущее отображаемое уведомление).
 */
export const ToastSlice = createSlice({
    name: "Toast",
    initialState,
    reducers: {
        showToast: {
            reducer(state, action: PayloadAction<ToastItem>) {
                const isDuplicate = state.queue.some(
                    t => t.message === action.payload.message && t.type === action.payload.type
                );
                if (!isDuplicate) {
                    state.queue.push(action.payload);
                }
            },
            prepare(payload: Omit<ToastItem, "id">) {
                return {payload: {...payload, id: nanoid()}};
            },
        },
        hideToast(state) {
            state.queue.splice(0, 1);
        },
    },
});

export const {showToast, hideToast} = ToastSlice.actions;

export const ToastReducer = ToastSlice.reducer;
