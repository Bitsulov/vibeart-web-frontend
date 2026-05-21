/** Схема полей формы создания сообщества для react-hook-form. */
export interface ICreateCommunityForm {
    /** Base64 или ObjectURL загруженного изображения-аватара сообщества. */
    avatar: string;
    /** Название сообщества (3–15 символов). */
    title: string;
    /** Описание сообщества (до 200 символов). */
    description: string;
    /** Короткий идентификатор сообщества (2–10 символов). */
    id: string;
}
