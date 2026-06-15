/**
 * Описывает тело ошибки, возвращаемое сервером в ответах API.
 */
export interface AppError {
    /** HTTP-код статуса ошибки. */
    statusCode: number;
    /** Сообщение об ошибке. */
    message: string;
    /** Путь запроса, на котором произошла ошибка. */
    path: string;
    /** Дата и время возникновения ошибки в формате ISO 8601. */
    timestamp: string;
}
