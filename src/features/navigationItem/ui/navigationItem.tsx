import c from "./navigationItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import {useTranslation} from "react-i18next";
import type {LucideIcon} from "lucide-react";

/** Свойства компонента {@link NavigationItem}. */
interface NavigationItemProps extends Omit<LinkProps, "to"> {
    /** Компонент иконки из библиотеки Lucide. */
    Icon: LucideIcon;
    /** ULID текущего пользователя — передаётся в генератор URL конфигурации ссылки. */
    ULID: string;
    /**
     * Конфигурация пункта навигации:
     * - `href` — функция, генерирующая URL на основе ULID пользователя.
     * - `icon` — иконка пункта.
     * - `title` — ключ локализации для подписи.
     * - `ariaLabel` — ключ локализации для метки доступности.
     * - `isAdmin` — признак того, что пункт доступен только администраторам.
     */
    link: {
        href: (ULID: string) => string;
        icon: LucideIcon;
        title: string;
        ariaLabel: string;
        isAdmin: boolean;
    };
    /** Текущий путь маршрутизатора. Используется для установки `aria-current="page"`. */
    path: string;
    /** Количество непрочитанных сообщений в чатах. Отображается как числовой бейдж. */
    chatsNotices: number;
    /** Количество непрочитанных уведомлений. Отображается как числовой бейдж. */
    notificationsNotices: number;
}

/**
 * Один пункт боковой навигации.
 *
 * Устанавливает `aria-current="page"` при совпадении сгенерированного URL
 * с текущим путём. Для пунктов «Чаты» и «Уведомления» отображает
 * числовой бейдж при наличии непрочитанных элементов.
 */
export const NavigationItem = ({
    Icon,
    ULID,
    link,
    path,
    chatsNotices,
    notificationsNotices,
    ...props
}: NavigationItemProps) => {
    const { t } = useTranslation();
    const href = link.href(ULID);

	return (
        <Link
            aria-current={href === path ? "page" : undefined}
            aria-label={t(link.ariaLabel)}
            to={href}
            className={c.link}
            {...props}
        >
            <Icon className={c.icon} width="42" height="42" />
            <span className={c.title}>{t(link.title)}</span>
            {href === "/chats" && chatsNotices > 0 ?
                <span className={c.number}>{chatsNotices}</span>
            : href === "/notifications" && chatsNotices > 0 ?
                <span className={c.number}>{notificationsNotices}</span>
            : <></>
            }
        </Link>
	)
}
