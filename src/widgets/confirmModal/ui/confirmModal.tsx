import c from "./confirmModal.module.scss";
import {closeButtonClickHandler} from "../model/closeButtonClickHandler";
import clsx from "clsx";
import {modalClickHandler} from "../model/modalClickButton";
import {StylizedButton} from "features/stylizedButton";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {useTranslation} from "react-i18next";
import {defaultTransitionTime} from "shared/const/const";
import {TransparentButton} from "features/transparentButton";
import {agreeHandlerClick} from "../model/agreeHandlerClick";

/** Свойства компонента {@link ConfirmModal}. */
interface ConfirmModalProps {
    /** Признак того, что модальное окно в данный момент открыто. */
    isShowModal: boolean;
    /** Функция обновления признака видимости модального окна. */
    setIsShowModal: Dispatch<SetStateAction<boolean>>;
    /** Функция, вызываемая при нажатии кнопки подтверждения. По умолчанию — пустая функция. */
    confirmFn?: () => void;
    /** Текст вопроса, отображаемый в теле модального окна. По умолчанию используется локализованная строка `questionAgreed`. */
    text?: string;
    /** Метка доступности кнопки подтверждения для программ чтения с экрана. */
    ariaLabelConfirm?: string;
}

/**
 * Модальное окно подтверждения произвольного действия.
 *
 * Отображает текст вопроса и две кнопки: «Отмена» и «Подтвердить».
 * При нажатии «Подтвердить» вызывает {@link confirmFn} через {@link agreeHandlerClick}.
 * Закрывается по клику на фон или кнопку «Отмена» с анимацией исчезновения.
 */
export const ConfirmModal = ({
    text = "",
    confirmFn = () => {},
    ariaLabelConfirm = "",
    isShowModal,
    setIsShowModal,
    ...props
}: ConfirmModalProps) => {
    const { t } = useTranslation();

    const [isDisappearring, setIsDisappearring] = useState(false);
    const transitionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"))
        || defaultTransitionTime;

	return (
        <>
            {isShowModal && (
                <div
                    onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal)}
                    className={clsx(c.background, isDisappearring && c.close)}
                >
                    <dialog open onClick={e => modalClickHandler(e)} aria-modal="true" className={c.modal} {...props}>
                        <div className={c.top}>
                            <h3 className={c.title}>{t("Confirm")}</h3>
                        </div>
                        <p className={c.text}>{text || t("questionAgreed")}</p>
                        <div className={c.bottom}>
                            <div className={c.buttons}>
                                <TransparentButton
                                    className={c.cancel_button}
                                    ariaLabel={t("ariaLabel.closeModal")}
                                    onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal)}
                                >
                                    {t("Cancel")}
                                </TransparentButton>
                                <StylizedButton
                                    ariaLabel={ariaLabelConfirm || t("ariaLabel.agreeModal")}
                                    onClick={() => agreeHandlerClick(confirmFn, setIsDisappearring, transitionTime, setIsShowModal)}
                                >
                                    {t("DoConfirm")}
                                </StylizedButton>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </>
	)
}
