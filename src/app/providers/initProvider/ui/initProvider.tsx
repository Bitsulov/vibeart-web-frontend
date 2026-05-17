import { useEffect } from "react";
import type { ReactNode } from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setLanguage} from "entities/appConfig";
import {principalUserMock, setUserInfo} from "entities/user";
import {useLocation, useNavigate} from "react-router-dom";
import {languagesConfig} from "widgets/layout";

/** Свойства компонента {@link InitProvider}. */
interface InitProviderProps {
    /** Дочернее дерево, монтируемое после завершения инициализации. */
    children: ReactNode;
}

/**
 * Провайдер инициализации приложения: записывает данные пользователя в Redux-хранилище
 * и синхронизирует язык интерфейса с URL-параметром `lang`.
 *
 * При первом монтировании записывает данные авторизованного пользователя в Redux через `setUserInfo`.
 * При каждом изменении адреса страницы проверяет параметр `lang` в строке запроса:
 * если отсутствует — определяет язык через i18n и добавляет его в URL;
 * если присутствует — устанавливает язык в i18n, Redux и атрибуте `lang` тега `<html>`.
 */
export const InitProvider = ({ children }: InitProviderProps) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setUserInfo({
            id: principalUserMock.id,
            ULID: principalUserMock.ULID,
            email: principalUserMock.email,
            name: principalUserMock.name,
            username: principalUserMock.username,
            description: principalUserMock.description,
            worksCount: principalUserMock.worksCount,
            subscribersCount: principalUserMock.subscribersCount,
            subscribesCount: principalUserMock.subscribesCount,
            albumList: principalUserMock.albumList,
            createdAt: principalUserMock.createdAt,
            trustStatus: principalUserMock.trustStatus,
            isAuthenticated: principalUserMock.isAuthenticated,
            isBlocked: principalUserMock.isBlocked,
            onlineStatus: principalUserMock.onlineStatus,
            role: principalUserMock.role,
            avatarUrl: principalUserMock.avatarUrl,
        }));
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const langParam = params.get('lang');

        if(!langParam) {
            const i18nLang = i18n.language.split("-", 1)[0];
            const lang = document.documentElement.lang = languagesConfig[i18nLang]?.[4] || "en";
            dispatch(setLanguage(lang));
            params.set('lang', lang);
            navigate({search: params.toString()}, {replace: true});
        } else {
            document.documentElement.lang = languagesConfig[langParam]?.[4] || "en";
            dispatch(setLanguage(langParam));
            i18n.changeLanguage(langParam)
                .catch((er) => console.error("change language error:", er));
            if(langParam !== document.documentElement.lang) {
                params.set('lang', document.documentElement.lang);
                navigate({search: params.toString()}, {replace: true});
            }
        }
    }, [location, dispatch, i18n, navigate]);

	return (
		<>
            {children}
		</>
	)
}
