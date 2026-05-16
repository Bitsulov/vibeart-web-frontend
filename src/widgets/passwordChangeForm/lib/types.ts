/** Данные формы изменения пароля: старый, новый и подтверждение нового пароля. */
export interface IPasswordChangeForm {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

/** Данные формы ввода кода подтверждения. */
export interface ICodeForm {
    code: string;
}
