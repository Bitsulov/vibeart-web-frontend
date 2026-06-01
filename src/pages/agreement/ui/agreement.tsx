import {Layout} from "widgets/layout";
import {AgreementText} from "widgets/agreementText";
import {useTranslation} from "react-i18next";

/** Страница пользовательского соглашения. */
export const Agreement = () => {
    const { t } = useTranslation();

	return (
		<Layout>
            <title>{t("titles.agreement")}</title>
            <meta name="description" content={t("description.agreement")} />
            <meta property="og:title" content={t("titles.agreement")} />
            <meta property="og:description" content={t("description.agreement")} />
            <AgreementText />
		</Layout>
	)
}
