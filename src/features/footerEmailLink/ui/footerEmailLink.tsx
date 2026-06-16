import c from "./footerEmailLink.module.scss";
import { useTranslation } from "react-i18next";
import { CopyButton } from "features/copyButton";

/** Email-ссылка в футере с кнопкой копирования адреса. */
export const FooterEmailLink = ({ ...props }) => {
    const { t } = useTranslation();
    const email = import.meta.env.VITE_EMAIL;

    return (
        <div className={c.link_wrapper}>
            <a
                aria-label={t("ariaLabel.goToEmail")}
                href={`mailto:${email}`}
                className={c.link}
                {...props}
            >
                {email}
            </a>
            <CopyButton className={c.copy} text={email} />
        </div>
    );
};
