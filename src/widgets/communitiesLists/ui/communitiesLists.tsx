import c from "./communitiesLists.module.scss";
import {useTranslation} from "react-i18next";
import {SearchInput} from "features/searchInput";
import {CommunitiesAddButton} from "features/communitiesAddButton";
import type { ComponentPropsWithoutRef } from "react";
import type {CommunityType} from "entities/community";
import {CommunitiesList} from "widgets/communitiesList";

/** Свойства компонента {@link CommunitiesLists}. */
interface CommunitiesListsProps extends ComponentPropsWithoutRef<"section"> {
    /** Список сообществ, на которые подписан текущий пользователь. */
    communitiesListMy: CommunityType[];
    /** Список всех остальных доступных сообществ, не вошедших в подписки. */
    communitiesListAll: CommunityType[];
}

/**
 * Секция страницы сообществ: поле поиска, кнопка создания и два списка — «мои» и «все».
 *
 * Объединяет {@link CommunitiesList} для подписанных и всех остальных сообществ,
 * а также кнопку перехода к созданию нового сообщества {@link CommunitiesAddButton}.
 */
export const CommunitiesLists = ({
    communitiesListMy,
    communitiesListAll,
    ...props
}: CommunitiesListsProps) => {
    const { t } = useTranslation();

	return (
		<section className={c.communities} {...props}>
            <h1 className={c.title}>{t("communities.title")}</h1>
            <SearchInput className={c.search} placeholder={t("searchPlaceholder")} />
            <CommunitiesAddButton className={c.button} />
            <CommunitiesList
                className={c.list_my}
                communitiesList={communitiesListMy}
                title={t("communities.myCommunities")}
                emptyTitle={t("communities.emptyMy")}
            />
            <CommunitiesList
                className={c.list_all}
                communitiesList={communitiesListAll}
                title={t("communities.allCommunities")}
                emptyTitle={t("communities.emptyAll")}
            />
		</section>
	)
}
