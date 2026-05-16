/** Данные формы изменения email: текущий и новый адрес. */
export interface IEmailChangeForm {
    oldEmail: string;
    newEmail: string;
}

/** Данные формы ввода кода подтверждения. */
export interface ICodeForm {
    code: string;
}
