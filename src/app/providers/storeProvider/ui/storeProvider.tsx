import {Provider} from "react-redux";
import {store} from "app/store";
import type {ReactNode} from "react";

/** Свойства компонента {@link StoreProvider}. */
interface StoreProviderProps {
    /** Дочернее дерево, которое получает доступ к Redux-хранилищу через контекст. */
    children: ReactNode;
}

/** Оборачивает дерево компонентов в Redux `Provider` с корневым хранилищем приложения. */
export const StoreProvider = ({children}: StoreProviderProps) => {
	return (
		<Provider store={store}>
            {children}
		</Provider>
	)
}
