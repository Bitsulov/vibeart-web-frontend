import c from "./emailChangeForm.module.scss";
import {useForm, useWatch} from "react-hook-form";
import {useTranslation} from "react-i18next";
import type {ICodeForm, IEmailChangeForm} from "../lib/types";
import {InputForm} from "features/inputForm";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import {useDispatch} from "react-redux";
import {type ComponentPropsWithoutRef, useState} from "react";
import {StylizedButton} from "features/stylizedButton";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {returnToEmailHandler} from "../model/returnToEmailHandler";
import {CodeInputs} from "features/codeInputs";
import {codeSubmitValidHandler} from "../model/codeSubmitValidHandler";

/**
 * Двухшаговая форма изменения email: ввод текущего и нового адреса,
 * затем ввод кода подтверждения из письма.
 */
export const EmailChangeForm = ({ ...props }: ComponentPropsWithoutRef<"form">) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isDesktop = windowWidth >= 1200;

    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

    const {register, setValue, handleSubmit, control, reset, formState: {errors, isSubmitted}, /*setError*/} = useForm<IEmailChangeForm>(
        {shouldFocusError: false}
    );
    
    const oldEmailValue = useWatch({ control, name: "oldEmail"});
    const newEmailValue = useWatch({ control, name: "newEmail"});

    const [newEmailResult, setNewEmailResult] = useState<string>("");

    const codeForm = useForm<ICodeForm>(
        {shouldFocusError: false}
    );

    const [codeError, setCodeError] = useState<boolean>(false);

	return (
		<>
            {!isEmailSent ?
                <form
                    key="email"
                    onSubmit={handleSubmit(
                        () => submitValidHandler(setValue, setIsEmailSent, setNewEmailResult, newEmailValue),
                        (errors) => submitInvalidHandler(errors, dispatch)
                    )}
                    className={c.form}
                    {...props}
                >
                    <h2 className={c.title}>{t("emailChange.title")}</h2>
                    <div className={c.inputs}>
                        <InputForm
                            {...register("oldEmail", {
                                required: "toast.requiredEmail",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "toast.wrongEmail"
                                }
                            })}
                            value={oldEmailValue}
                            placeholder={t("emailChange.oldEmailPlaceholder")}
                            className={c.input}
                            isError={!!errors.oldEmail}
                            isSubmitted={isSubmitted}
                        />
                        <InputForm
                            {...register("newEmail", {
                                required: "toast.requiredEmail",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "toast.wrongEmail"
                                },
                                validate: {
                                    value: (newEmail, { oldEmail }) => oldEmail !== newEmail || "toast.sameEmails"
                                }
                            })}
                            value={newEmailValue}
                            placeholder={t("emailChange.newEmailPlaceholder")}
                            className={c.input}
                            isError={!!errors.newEmail}
                            isSubmitted={isSubmitted}
                        />
                    </div>
                    <StylizedButton aria-label={t("ariaLabel.continue")} type="submit" className={c.submit}>
                        {isDesktop ?
                            <ArrowRight className={c.icon} width="24" height="24" />
                            :
                            t("Continue")
                        }
                    </StylizedButton>
                </form>
            :
                <form
                    key="code"
                    onSubmit={codeForm.handleSubmit(
                        (data) => codeSubmitValidHandler(data, dispatch, setCodeError, setIsEmailSent, reset)
                    )}
                    className={c.form}
                    {...props}
                >
                    <h2 className={c.title}>{t("emailChange.title")}</h2>
                    <StylizedButton
                        type="button"
                        onClick={() => returnToEmailHandler(setIsEmailSent, reset, codeForm.reset)}
                        aria-label={t("ariaLabel.backToChangeEmail")}
                        className={c.back}
                    >
                        <ArrowLeft className={c.icon} width="15" height="15" />
                    </StylizedButton>
                    <p className={c.text}>{t("emailChange.sentCodeText", {address: newEmailResult})}</p>
                    <CodeInputs
                        isError={codeError}
                        setCode={(value) => codeForm.setValue("code", value)}
                        className={c.code}
                    />
                    <StylizedButton aria-label={t("ariaLabel.changeEmail")} type="submit" className={c.submit_email}>
                        {t("Send")}
                    </StylizedButton>
                </form>
            }
        </>
	)
}
