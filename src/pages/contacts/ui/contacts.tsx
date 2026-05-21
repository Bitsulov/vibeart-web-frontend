import {Layout} from "widgets/layout";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import {ContactsForm} from "widgets/contactsForm";
import {useTranslation} from "react-i18next";

/**
 * Страница связи с администрацией.
 *
 * Загружает данные текущего пользователя из Redux и передаёт их в {@link ContactsForm}.
 */
export const Contacts = () => {
    const { t } = useTranslation();
    const userInfo = useSelector(selectUserInfo);

	return (
		<Layout>
            <title>{t("titles.contacts")}</title>
            <meta name="description" content={t("description.contacts")} />
            <ContactsForm userInfo={userInfo} />
		</Layout>
	)
}
