import type {RootState} from "app/store";

/** Возвращает первое уведомление в очереди или `null`, если очередь пуста. */
export const selectCurrentToast = (state: RootState) => state.toast.queue[0] ?? null;
