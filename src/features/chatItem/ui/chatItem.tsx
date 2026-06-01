import c from "./chatItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getChatDate} from "shared/lib/getChatDate";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import defaultAvatar from "shared/icons/icon-user.svg";

/** Свойства компонента {@link ChatItem}. */
interface ChatItemProps extends Omit<LinkProps, "to"> {
    /** ULID диалога для формирования ссылки `/chats/:ulid`. */
    ULID: string;
    /** Имя собеседника, отображаемое в заголовке карточки. */
    title: string;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** URL аватара собеседника. При отсутствии подставляется иконка-заглушка. */
    imageUrl: string;
    /** Текст последнего сообщения в диалоге. */
    lastMessage: string;
    /** Дата последнего сообщения в формате ISO 8601. Форматируется через {@link getChatDate}. */
    date: string;
}

/**
 * Карточка диалога в списке чатов.
 *
 * Отображает аватар собеседника, его имя, текст последнего сообщения
 * и локализованную дату. При нажатии переходит в диалог.
 */
export const ChatItem = ({
    className = "",
    title,
    ULID,
    imageUrl,
    lastMessage,
    date,
    ...props
}: ChatItemProps) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);

    const resultDate = getChatDate(t, currentLanguage, date);

	return (
		<Link
            aria-label={t("ariaLabel.goToChat", {name: title})}
            className={`${c.chat} ${className}`}
            to={`/chats/${ULID}`}
            {...props}
        >
            <img src={imageUrl || defaultAvatar} alt={`${t("avatar")} ${title}`} className={c.img} />
            <div className={c.info}>
                <h2 className={c.title}>{title}</h2>
                <div className={c.bottom}>
                    <p className={c.text}>{lastMessage}</p>
                    <p className={c.date}>{resultDate}</p>
                </div>
            </div>
		</Link>
	)
}
