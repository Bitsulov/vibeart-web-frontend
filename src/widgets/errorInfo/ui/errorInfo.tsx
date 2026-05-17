import c from "./errorInfo.module.scss";
import {useTranslation} from "react-i18next";
import {errorsConfig} from "../config/errorsConfig";
import {StylizedLink} from "features/stylizedLink";

/** Свойства компонента {@link ErrorInfo}. */
interface ErrorInfoProps {
    /** HTTP-код ошибки. По умолчанию `404`. Текст описания ошибки определяется по коду через {@link errorsConfig}. */
    errorCode?: number;
}

/**
 * Секция страницы ошибки с кодом, локализованным описанием и ссылками для навигации.
 *
 * Текст описания ошибки подбирается по `errorCode` из {@link errorsConfig}.
 * Отображает ссылки «На главную» и «Сообщить об ошибке».
 */
export const ErrorInfo = ({ errorCode = 404, ...props }: ErrorInfoProps) => {
    const { t } = useTranslation();

	return (
		<section className={c.error} {...props}>
            <div className="container">
                <h1 className={c.title}>{t("error.errorTitle")}</h1>
                <h2 className={c.code}>{errorCode}</h2>
                <p className={c.error_text}>
                    {t(errorsConfig[errorCode])}
                </p>
                <div className={c.links}>
                    <StylizedLink className={c.link} ariaLabel={t("ariaLabel.goToHome")} href="/">{t("error.returnToHome")}</StylizedLink>
                    <StylizedLink className={c.link} ariaLabel={t("ariaLabel.goToContacts")} href="/contacts">{t("error.report")}</StylizedLink>
                </div>
            </div>
		</section>
	)
}
