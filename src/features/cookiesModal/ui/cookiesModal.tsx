import c from "./cookiesModal.module.scss";
import type {ComponentPropsWithoutRef, Dispatch, SetStateAction} from "react";
import {Trans, useTranslation} from "react-i18next";
import {StylizedButton} from "features/stylizedButton";
import {closeModalHandler} from "../model/closeModalHandler";
import {Link} from "react-router-dom";

/** Свойства компонента {@link CookiesModal}. */
interface CookiesModalProps extends ComponentPropsWithoutRef<"dialog"> {
    /** Признак видимости модального окна. */
    isShow: boolean;
    /** Функция обновления признака видимости. */
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

/**
 * Модальное окно с уведомлением об использовании куки.
 *
 * Отображается только на клиенте — сервер всегда рендерит `isShow=false`,
 * поэтому SEO-роботы не видят окно. При принятии сохраняет куки-файл
 * `acceptedCookie=1` сроком на 1 год через {@link closeModalHandler}.
 */
export const CookiesModal = ({ isShow, setIsShow, ...props }: CookiesModalProps) => {
    const { t } = useTranslation();

	return (
		<>
            {isShow &&
                <div className={c.background}>
                    <div className="container">
                        <dialog className={c.modal} open {...props}>
                            <h2 className={c.title}>{t("cookies.title")}</h2>
                            <p className={c.text}>
                                <Trans
                                    i18nKey="cookies.text"
                                    components={{
                                        policy: <Link to="/policy" className={c.link} />,
                                        agreement: <Link to="/agreement" className={c.link} />
                                    }}
                                />
                            </p>
                            <StylizedButton
                                onClick={() => closeModalHandler(setIsShow)}
                                aria-label={t("ariaLabel.acceptCookies")}
                                className={c.button}
                            >
                                {t("Accept")}
                            </StylizedButton>
                        </dialog>
                    </div>
                </div>
            }
        </>
	)
}
