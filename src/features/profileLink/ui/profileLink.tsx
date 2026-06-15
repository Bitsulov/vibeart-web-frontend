import c from "./profileLink.module.scss";
import {Link} from "react-router-dom";
import {MessageCircle, Settings} from "lucide-react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {showHint} from "../model/showHint";
import {hideHint} from "../model/hideHint";

/** Свойства компонента {@link ProfileLink}. */
interface ProfileLinkProps {
    /** Признак того, что просматриваемый профиль принадлежит текущему пользователю. */
    isPrincipalUser: boolean;
    /** Имя пользователя. */
    name: string;
    /** UUID пользователя для формирования ссылки на диалог `/chats/:uuid`. */
    UUID: string;
}

/**
 * Контекстная ссылка действия на странице профиля.
 *
 * Для своего профиля отображает ссылку на страницу настроек,
 * для чужого — ссылку на личный диалог с этим пользователем.
 * При наведении показывает подсказку через Redux.
 */
export const ProfileLink = ({ isPrincipalUser, name, UUID, ...props }: ProfileLinkProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

	return (
		<>
            {isPrincipalUser ?
                <Link
                    aria-label={t("ariaLabel.goToSettings")}
                    to="/settings"
                    className={c.settings_wrapper}
                    onMouseEnter={() => showHint(dispatch, t("hint.settings"))}
                    onMouseLeave={() => hideHint(dispatch)}
                    onClick={() => hideHint(dispatch)}
                    {...props}
                >
                    <Settings className={c.settings} width="31" height="31" />
                </Link>
                :
                <Link
                    aria-label={t("ariaLabel.writeUser", {name: name})}
                    to={`/chats/${UUID}`}
                    className={c.messages_wrapper}
                    onMouseEnter={() => showHint(dispatch, t("hint.writeMessage"))}
                    onMouseLeave={() => hideHint(dispatch)}
                    onClick={() => hideHint(dispatch)}
                    {...props}
                >
                    <MessageCircle className={c.message} width="31" height="31" />
                </Link>
            }
		</>
	)
}
