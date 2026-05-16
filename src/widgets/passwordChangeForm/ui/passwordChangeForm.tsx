import c from "./passwordChangeForm.module.scss";
import {InputForm} from "features/inputForm";
import {StylizedButton} from "features/stylizedButton";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useForm, useWatch} from "react-hook-form";
import type {IPasswordChangeForm} from "../lib/types";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {type ComponentPropsWithoutRef, useState} from "react";
import {codeSubmitValidHandler} from "../model/codeSubmitValidHandler";
import {returnToEmailHandler} from "../model/returnToEmailHandler";
import {CodeInputs} from "features/codeInputs";
import type {ICodeForm} from "../lib/types";

interface PasswordChangeFormProps extends ComponentPropsWithoutRef<"form"> {
    email: string;
}

/**
 * Двухшаговая форма изменения пароля: ввод старого/нового/подтверждения пароля,
 * затем ввод кода подтверждения.
 *
 * @param email - Email пользователя, отображается в тексте с адресом для отправки кода.
 */
export const PasswordChangeForm = ({ email, ...props }: PasswordChangeFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isDesktop = windowWidth >= 1200;

    const [isPasswordSent, setIsPasswordSent] = useState<boolean>(false);

    const {register, setValue, handleSubmit, reset, control, formState: {errors, isSubmitted}, /*setError*/} = useForm<IPasswordChangeForm>(
        {shouldFocusError: false}
    );

    const oldPasswordValue = useWatch({ control, name: "oldPassword"});
    const newPasswordValue = useWatch({ control, name: "newPassword"});
    const confirmNewPasswordValue = useWatch({ control, name: "confirmNewPassword"});

    const [_newPasswordResult, setNewPasswordResult] = useState<string>("");

    const codeForm = useForm<ICodeForm>(
        {shouldFocusError: false}
    );

    const [codeError, setCodeError] = useState<boolean>(false);

	return (
        <>
            {!isPasswordSent ?
                <form
                    key="password"
                    onSubmit={handleSubmit(
                        () => submitValidHandler(setValue, setIsPasswordSent, setNewPasswordResult, newPasswordValue),
                        (errors) => submitInvalidHandler(errors, dispatch)
                    )}
                    className={c.form}
                    {...props}
                >
                    <h1 className={c.title}>{t("passwordChange.title")}</h1>
                    <div className={c.inputs}>
                        <InputForm
                            {...register("oldPassword", {
                                required: "toast.requiredPassword"
                            })}
                            value={oldPasswordValue}
                            type="password"
                            placeholder={t("passwordChange.oldPasswordPlaceholder")}
                            className={c.input}
                            isError={!!errors.oldPassword}
                            isSubmitted={isSubmitted}
                        />
                        <InputForm
                            {...register("newPassword", {
                                required: "toast.requiredPassword",
                                minLength: {
                                    value: 6,
                                    message: "errors.shortPassword"
                                },
                                maxLength: {
                                    value: 64,
                                    message: "errors.longPassword"
                                },
                                validate: {
                                    value: (newPassword, { oldPassword }) => (
                                        oldPassword !== newPassword || "toast.samePasswords"
                                    )
                                }
                            })}
                            value={newPasswordValue}
                            type="password"
                            placeholder={t("passwordChange.newPasswordPlaceholder")}
                            className={c.input}
                            isError={!!errors.newPassword}
                            isSubmitted={isSubmitted}
                        />
                        <InputForm
                            {...register("confirmNewPassword", {
                                required: "toast.requiredPassword",
                                minLength: {
                                    value: 6,
                                    message: "errors.shortPassword"
                                },
                                maxLength: {
                                    value: 64,
                                    message: "errors.longPassword"
                                },
                                validate: {
                                    value: (confirmNewPassword, { newPassword }) => (
                                        confirmNewPassword === newPassword || "toast.notSamePasswords"
                                    )
                                }
                            })}
                            value={confirmNewPasswordValue}
                            type="password"
                            placeholder={t("passwordChange.confirmNewPasswordPlaceholder")}
                            className={c.input}
                            isError={!!errors.confirmNewPassword}
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
                        (data) => codeSubmitValidHandler(data, dispatch, setCodeError, setIsPasswordSent, reset)
                    )}
                    className={c.form}
                    {...props}
                >
                    <h2 className={c.title}>{t("passwordChange.title")}</h2>
                    <StylizedButton
                        type="button"
                        onClick={() => returnToEmailHandler(setIsPasswordSent, reset, codeForm.reset)}
                        aria-label={t("ariaLabel.backToChangePassword")}
                        className={c.back}
                    >
                        <ArrowLeft className={c.icon} width="15" height="15" />
                    </StylizedButton>
                    <p className={c.text}>{t("passwordChange.sentCodeText", {address: email})}</p>
                    <CodeInputs
                        isError={codeError}
                        setCode={(value) => codeForm.setValue("code", value)}
                        className={c.code}
                    />
                    <StylizedButton aria-label={t("ariaLabel.changePassword")} type="submit" className={c.submit_email}>
                        {t("Send")}
                    </StylizedButton>
                </form>
            }
        </>
	)
}
