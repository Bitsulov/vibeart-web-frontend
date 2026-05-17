import {Layout} from "widgets/layout";
import c from "./settings.module.scss";
import {Navigation} from "widgets/navigation";
import {profileUserMock, selectUserInfo, type UserType} from "entities/user";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {SettingsForm} from "widgets/settingsForm";
import {useSelector} from "react-redux";
import {useState} from "react";
import {EmailChangeForm} from "widgets/emailChangeForm";
import {PasswordChangeForm} from "widgets/passwordChangeForm";

/**
 * Страница настроек профиля пользователя.
 *
 * Хранит локальное состояние `userState` — копию данных из Redux,
 * которую компонент {@link SettingsForm} обновляет при каждом изменении
 * поля формы для живого предпросмотра аватара, имени и описания без
 * обращения к серверу. Инициализируется текущими данными из `selectUserInfo`.
 *
 * На ширине экрана ≥ 1200 px отображается боковая {@link Navigation}.
 *
 * Включает три независимые формы:
 * - {@link SettingsForm} — редактирование аватара, имени, имени пользователя
 *   и описания профиля.
 * - {@link EmailChangeForm} — двухшаговая смена e-mail адреса: ввод нового
 *   адреса → ввод кода подтверждения из письма.
 * - {@link PasswordChangeForm} — двухшаговая смена пароля: ввод старого и
 *   нового паролей → ввод кода подтверждения из письма.
 */
export const Settings = () => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);

    const [userState, setUserState] = useState<Partial<UserType>>(userInfo);

	return (
		<Layout>
            <title>{t("titles.settings")}</title>
            <meta name="description" content={t("description.settings")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <div className={c.content}>
                        <SettingsForm userInfo={userState} setUserInfo={setUserState} />
                        <EmailChangeForm />
                        <PasswordChangeForm email={userInfo.email} />
                    </div>
                </div>
            </div>
		</Layout>
	)
}
