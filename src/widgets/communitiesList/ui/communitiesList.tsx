import c from "./communitiesList.module.scss";
import type { CommunityType } from "entities/community";
import { CommunityItem } from "features/communityItem";
import type { ComponentPropsWithoutRef } from "react";

/** Свойства компонента {@link CommunitiesList}. */
interface CommunitiesListProps extends ComponentPropsWithoutRef<"div"> {
    /** Список сообществ для отображения. */
    communitiesList: CommunityType[];
    /** Заголовок секции над списком. */
    title: string;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Текст заглушки, отображаемый при пустом списке. */
    emptyTitle: string;
}

/**
 * Список сообществ с заголовком секции.
 *
 * При пустом списке отображает заглушку с текстом.
 * Каждое сообщество отрисовывается через {@link CommunityItem}.
 */
export const CommunitiesList = ({
    communitiesList,
    title,
    className = "",
    emptyTitle = "",
    ...props
}: CommunitiesListProps) => {
    const isExistsCommunities = communitiesList && communitiesList.length > 0;

    return (
        <div className={`${c.communities_list} ${className}`} {...props}>
            <h1 className={c.title}>{title}</h1>
            <div className={c.list}>
                {isExistsCommunities ? (
                    communitiesList.map(community => (
                        <CommunityItem
                            key={community.UUID}
                            imageUrl={community.imageUrl}
                            UUID={community.UUID}
                            title={community.title}
                            description={community.description}
                            subscribersCount={community.subscribers}
                            isSubscribed={community.isSubscribed}
                        />
                    ))
                ) : (
                    <h2 className={c.empty}>{emptyTitle}</h2>
                )}
            </div>
        </div>
    );
};
