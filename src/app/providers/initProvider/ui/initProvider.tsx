import { useEffect } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, selectCurrentLanguage } from "entities/appConfig";
import { principalUserMock, setUserInfo } from "entities/user";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { supportedLangs, defaultLang } from "shared/const/const";

/** Свойства компонента {@link InitProvider}. */
interface InitProviderProps {
    /** Дочернее дерево, монтируемое после завершения инициализации. */
    children: ReactNode;
}

/**
 * Провайдер инициализации приложения.
 *
 * Выполняет две задачи:
 *
 * 1. **Инициализация пользователя.** При монтировании записывает данные
 *    авторизованного пользователя в Redux-хранилище через {@link setUserInfo}.
 *
 * 2. **Синхронизация языка с URL.** При каждом изменении пути проверяет
 *    языковой сегмент URL и приводит состояние приложения к согласованному
 *    виду в следующем порядке:
 *
 *    - Если языковой сегмент отсутствует, выполняется навигация с добавлением
 *      языка из текущего экземпляра i18n.
 *    - Если языковой сегмент не входит в список поддерживаемых, выполняется
 *      навигация с заменой сегмента на `"en"`.
 *    - Если языковой сегмент отличается от значения в Redux, Redux и i18n
 *      синхронизируются с URL.
 *    - Если все значения совпадают, обновляется атрибут `lang` тега `<html>`.
 *
 * Языковой сегмент извлекается из совпадающих маршрутов через
 * {@link useMatches}, что надёжнее прямого разбора `pathname`, так как
 * учитывает, является ли первый сегмент именованным параметром `:lang`.
 *
 * @param props - Свойства компонента.
 * @param props.children - Дочернее дерево, отрисовываемое внутри провайдера.
 */
export const InitProvider = ({ children }: InitProviderProps) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const lang = useSelector(selectCurrentLanguage);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Возвращает текущие активные маршруты
    const matchesUrls = useMatches();

    // Возвращает код текущего языка из пути текущего маршрута
    const urlLangParam = matchesUrls
        .map(m => m.params["lang"])
        .find(l => l !== undefined);

    useEffect(() => {
        dispatch(setUserInfo({
            UUID: principalUserMock.UUID,
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
            accessToken: principalUserMock.accessToken,
            refreshToken: principalUserMock.refreshToken,
            accessTokenExpiresIn: principalUserMock.accessTokenExpiresIn,
            refreshTokenExpiresIn: principalUserMock.refreshTokenExpiresIn,
        }));
    }, [dispatch]);

    useEffect(() => {
        // Заход на сайт без определенного языка
        if (urlLangParam === undefined) {
            navigate(`/${i18n.language}${pathname}`, { replace: true });
        // Язык не поддерживается
        } else if (!supportedLangs.includes(urlLangParam)) {
            navigate(`/${defaultLang}${pathname.slice(1 + urlLangParam.length)}`, { replace: true });
        // Сохранённый язык не совпадает с URL
        } else if (urlLangParam !== lang) {
            // Смена языка в интерфейсе
            if (i18n.language === lang) {
                navigate(`/${lang}${pathname.slice(1 + urlLangParam.length)}`, { replace: true });
            // Первый заход, redux еще не синхронизирован
            } else {
                dispatch(setLanguage(urlLangParam));
                i18n.changeLanguage(urlLangParam).catch((er) => console.error("change language error:", er));
                document.documentElement.lang = urlLangParam;
            }
        } else {
            document.documentElement.lang = lang;
        }
    }, [pathname, urlLangParam, lang, dispatch, i18n, navigate]);

    return (
        <>
            {children}
        </>
    );
};
