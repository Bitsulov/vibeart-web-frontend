import {Layout} from "widgets/layout";
import {RegisterForm} from "widgets/registerForm";
import {useTranslation} from "react-i18next";

/** Страница регистрации. */
export const Register = () => {
    const { t } = useTranslation();



	return (
        <Layout isSmallTitle={true} isShowFooter={false}>
            <title>{t("titles.register")}</title>
            <meta name="description" content={t("description.register")} />
            <meta property="og:title" content={t("titles.register")} />
            <meta property="og:description" content={t("description.register")} />
            <RegisterForm />
        </Layout>
    )
}
