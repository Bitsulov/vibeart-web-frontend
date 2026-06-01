import {Layout} from "widgets/layout";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import {CreateCommunityWidget} from "widgets/createCommunityWidget";
import {useState} from "react";
import type {CommunityType} from "entities/community";
import {communityTagsMock} from "entities/tag";

/**
 * Страница создания нового сообщества.
 *
 * Получает данные текущего пользователя из Redux и передаёт их в {@link CreateCommunityWidget}.
 * Список тегов временно использует мок-данные {@link communityTagsMock}.
 * Состояние формируемого сообщества хранится локально и обновляется при предпросмотре.
 */
export const CreateCommunity = () => {
    const { t } = useTranslation();
    const userInfo = useSelector(selectUserInfo);
    const [communityInfo, setCommunityInfo] = useState<Partial<CommunityType>>({});

	return (
		<Layout isSmallTitle={true}>
            <title>{t("titles.communityCreate")}</title>
            <meta name="description" content={t("description.communityCreate")} />
            <meta property="og:title" content={t("titles.communityCreate")} />
            <meta property="og:description" content={t("description.communityCreate")} />
            <CreateCommunityWidget
                tagsList={communityTagsMock}
                communityInfo={communityInfo}
                setCommunityInfo={setCommunityInfo}
                userInfo={userInfo}
            />
		</Layout>
	)
}
