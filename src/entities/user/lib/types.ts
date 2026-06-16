import type { Roles } from "entities/role";
import type { AlbumType } from "entities/album";

/**
 * Описывает пользователя сайта.
 *
 * Используется как для хранения данных текущего авторизованного
 * пользователя в хранилище Redux (слайс `user`), так и для
 * представления любого профиля, полученного с сервера.
 * Поля намеренно хранятся в плоской структуре для удобства
 * работы с селекторами.
 */
export interface UserType {
    /** UUID, используемый в публичных URL (например, `/profile/:uuid`). */
    UUID: string;
    /** Зарегистрированный адрес электронной почты. */
    email: string;
    /** Отображаемое имя пользователя. */
    name: string;
    /** Уникальный псевдоним пользователя для упоминаний и URL. */
    username: string;
    /** Краткое описание пользователя. */
    description: string;
    /** Общее количество опубликованных работ (постов). */
    worksCount: number;
    /** Количество пользователей, подписанных на этот аккаунт. */
    subscribersCount: number;
    /** Количество аккаунтов, на которые подписан данный пользователь. */
    subscribesCount: number;
    /** Список альбомов, принадлежащих пользователю. */
    albumList: AlbumType[];
    /** Дата и время создания аккаунта в формате ISO 8601. */
    createdAt: string;
    /** Уровень доверия, присвоенный модерацией платформы. */
    trustStatus: "trust" | "untrust";
    /** Признак того, что пользователь авторизован. */
    isAuthenticated: boolean;
    /** Признак блокировки аккаунта модерацией. */
    isBlocked: boolean;
    /** Статус присутствия пользователя в режиме реального времени. */
    onlineStatus: "online" | "offline";
    /** Роль пользователя на платформе, определяющая доступ к функциям. */
    role: Roles;
    /** URL аватара пользователя. Пустая строка, если аватар не задан. */
    avatarUrl: string;
    /** Зашифрованный access-токен авторизации. */
    accessToken: string;
    /** Зашифрованный refresh-токен авторизации. */
    refreshToken: string;
    /** Срок действия access-токена в миллисекундах. */
    accessTokenExpiresIn: number;
    /** Срок действия refresh-токена в миллисекундах. */
    refreshTokenExpiresIn: number;
}

/** Данные формы регистрации, отправляемые на сервер. */
export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

/** Адрес электронной почты для повторной отправки кода подтверждения. */
export interface SendCodeRequest {
    email: string;
}

/** Адрес электронной почты и код подтверждения для верификации аккаунта. */
export interface VerifyRequest {
    email: string;
    verificationCode: string;
}

/** Адрес электронной почты и пароль для входа в аккаунт. */
export interface SignInRequest {
    email: string;
    password: string;
}

/** Refresh-токен для обновления пары токенов авторизации. */
export interface RefreshRequest {
    refreshToken: string;
}

/** Результат входа, верификации или обновления токенов: UUID пользователя, пара токенов авторизации и сроки их действия. */
export interface AuthResponse {
    uuid: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}

/** Профиль текущего авторизованного пользователя. */
export interface UserDetailResponse {
    uuid: string;
    name: string;
    username: string;
    email: string;
    photoUrl: string;
    enabled: string;
}
