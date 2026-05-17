/**
 * @file Настройка и экспорт глобального хранилища Redux.
 *
 * Создаёт единственный экземпляр хранилища на основе корневого редьюсера.
 * Тип `RootState` выводится автоматически из структуры редьюсера и
 * используется во всех селекторах и `useSelector`-хуках приложения.
 *
 * Импортировать `store` напрямую следует только в коде провайдера —
 * остальные модули читают состояние через `useSelector` и отправляют
 * действия через `useDispatch`.
 */
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "../store/rootReducer";

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
