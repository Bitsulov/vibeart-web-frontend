import c from "./navigation.module.scss";
import {navigationConfig} from "../config/linksConfig";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUnreadChatsCount, selectUnreadNotificationsCount} from "entities/appConfig";
import {NavigationItem} from "features/navigationItem";

/** Свойства компонента {@link Navigation}. */
interface NavigationProps {
    /** ULID текущего пользователя — передаётся в каждый {@link NavigationItem} для генерации URL. */
    ULID: string;
    /** Роль текущего пользователя. Пункты с `isAdmin: true` отображаются только при значении `"admin"`. */
    role: string;
}

/**
 * Боковое навигационное меню с ссылками на основные разделы приложения.
 *
 * Формирует список ссылок из {@link navigationConfig}, скрывая административные
 * пункты для обычных пользователей. Отображает бейджи непрочитанных чатов
 * и уведомлений, считывая их количество из Redux-хранилища.
 */
export const Navigation = ({ ULID, role, ...props }: NavigationProps) => {
    const path = useLocation().pathname;
    const chatsNotices = useSelector(selectUnreadChatsCount);
    const notificationsNotices = useSelector(selectUnreadNotificationsCount);

	return (
        <aside className={c.nav_wrapper} {...props}>
            <nav className={c.nav}>
                {navigationConfig.map(link => {
                    const Icon = link.icon;

                    if(link.isAdmin) {
                        if(role === "admin") {
                            return (
                                <NavigationItem
                                    key={`link ${link.href(ULID)}`}
                                    Icon={Icon}
                                    ULID={ULID}
                                    link={link}
                                    path={path}
                                    chatsNotices={chatsNotices}
                                    notificationsNotices={notificationsNotices}
                                />
                            )
                        }
                    } else {
                        return (
                            <NavigationItem
                                key={`link ${link.href(ULID)}`}
                                Icon={Icon}
                                ULID={ULID}
                                link={link}
                                path={path}
                                chatsNotices={chatsNotices}
                                notificationsNotices={notificationsNotices}
                            />
                        )
                    }
                })}
            </nav>
        </aside>
	)
}
