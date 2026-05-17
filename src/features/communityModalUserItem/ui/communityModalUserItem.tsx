import c from "./communityModalUserItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import defaultAvatar from "shared/icons/icon-user.svg";

/** Свойства компонента {@link CommunityModalUserItem}. */
interface CommunityModalUserItemProps extends Omit<LinkProps, "to"> {
    /** URL аватара пользователя. При отсутствии используется заглушка. */
    imageUrl: string;
    /** Отображаемое имя пользователя. */
    name: string;
    /** ULID пользователя для формирования ссылки `/profile/:ulid`. */
    ULID: string;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
}

/**
 * Элемент списка участников в модальном окне сообщества.
 *
 * Отображает аватар и имя пользователя. При нажатии переходит
 * на страницу профиля (`/profile/:ulid`). При отсутствии аватара
 * подставляется иконка-заглушка.
 */
export const CommunityModalUserItem = ({
    imageUrl,
    name,
    ULID,
    className = "",
    ...props
}: CommunityModalUserItemProps) => {
	return (
		<Link to={`/profile/${ULID}`} className={`${c.user} ${className}`} {...props}>
            <img decoding="async" width="25" height="25" src={imageUrl || defaultAvatar} alt={name} className={c.img} />
            <p className={c.name}>{name}</p>
		</Link>
	)
}
