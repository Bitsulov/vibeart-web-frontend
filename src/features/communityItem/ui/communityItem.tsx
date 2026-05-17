import c from "./communityItem.module.scss";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import {StatItem} from "../../statItem";
import {UsersRound} from "lucide-react";
import {TransparentLink} from "../../transparentLink";
import {CommunitiesSubscribeButton} from "../../communitiesSubscribeButton";
import {showHint} from "../model/showHint";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {hideHint} from "../model/hideHint";

/** Свойства компонента {@link CommunityItem}. */
interface CommunitiesItemProps extends ComponentPropsWithoutRef<"article"> {
    /** URL обложки сообщества. */
    imageUrl?: string;
    /** ULID сообщества для формирования ссылки `/communities/:ulid`. */
    ULID: string;
    /** Название сообщества. */
    title?: string;
    /** Краткое описание сообщества. */
    description?: string;
    /** Количество подписчиков. */
    subscribersCount?: number;
    /** Признак подписки текущего пользователя на это сообщество. */
    isSubscribed?: boolean;
}

/**
 * Карточка сообщества в списке.
 *
 * Отображает обложку, счётчик подписчиков, название, описание,
 * ссылку на страницу сообщества и кнопку подписки/отписки.
 * Состояние подписки управляется локально.
 */
export const CommunityItem = ({
    imageUrl,
    ULID,
    title = "",
    description = "",
    subscribersCount = 0,
    isSubscribed = false,
    ...props
}: CommunitiesItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isSubscribedCommunity, setIsSubscribedCommunity] = useState<boolean>(isSubscribed);

	return (
		<article className={c.community} {...props}>
            <div className={c.info}>
                <div className={c.left}>
                    <img src={imageUrl} alt={title} className={c.img} />
                    <StatItem
                        onMouseEnter={() => showHint(dispatch, t("hint.subscribers"))}
                        onMouseLeave={() => hideHint(dispatch)}
                        Icon={UsersRound}
                        number={subscribersCount}
                        className={c.subscribers}
                    />
                </div>
                <div className={c.right}>
                    <h3 className={c.title}>{title}</h3>
                    <p className={c.description}>{description}</p>
                </div>
            </div>
            <div className={c.buttons}>
                <TransparentLink className={c.link} href={`/communities/${ULID}`}>{t("goLink")}</TransparentLink>
                <CommunitiesSubscribeButton
                    setIsSubscribed={setIsSubscribedCommunity}
                    className={c.subscribe}
                    isSubscribed={isSubscribedCommunity}
                />
            </div>
		</article>
	)
}
