/** Поля формы регистрации. */
export interface IRegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
    agreed: boolean;
    agreed2: boolean;
}

/** Поля формы подтверждения адреса электронной почты кодом из письма. */
export interface ICodeForm {
    code: string;
}
