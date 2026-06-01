import {Layout} from "widgets/layout";
import {ErrorInfo} from "widgets/errorInfo";
import {useTranslation} from "react-i18next";

/** Страница ошибки (404 и др.). */
export const Error = () => {
    const { t } = useTranslation();

	return (
        <Layout isShowFooter={false}>
            <title>{t("titles.error")}</title>
            <meta name="description" content={t("description.error")} />
            <meta property="og:title" content={t("titles.error")} />
            <meta property="og:description" content={t("description.error")} />
            <ErrorInfo/>
        </Layout>
    )
}
