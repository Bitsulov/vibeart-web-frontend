import c from "./communityUserItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import defaultAvatar from "shared/icons/icon-user.svg";
import type {MouseEventHandler} from "react";

/** Свойства компонента {@link CommunityUserItem}. */
interface CommunityUserItemProps extends Omit<LinkProps, "to"> {
    /** URL аватара пользователя. При отсутствии используется заглушка. */
    imageUrl: string;
    /** Отображаемое имя пользователя. */
    name: string;
    /** UUID пользователя для формирования ссылки `/profile/:uuid`. */
    UUID: string;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Обработчик клика. Можно использовать для перехвата навигации (`e.preventDefault()`). */
    onClick?: MouseEventHandler;
}

/**
 * Элемент списка участников сообщества.
 *
 * Отображает аватар и имя пользователя. При нажатии переходит
 * на страницу профиля (`/profile/:uuid`). При отсутствии аватара
 * подставляется иконка-заглушка.
 */
export const CommunityUserItem = ({
    imageUrl,
    name,
    UUID,
    className = "",
    onClick = () => {},
    ...props
}: CommunityUserItemProps) => {
	return (
		<Link onClick={onClick} to={`/profile/${UUID}`} className={`${c.user} ${className}`} {...props}>
            <img decoding="async" width="25" height="25" src={imageUrl || defaultAvatar} alt={name} className={c.img} />
            <p className={c.name}>{name}</p>
		</Link>
	)
}
