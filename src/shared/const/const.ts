/** Время CSS-перехода по умолчанию в миллисекундах. */
export const defaultTransitionTime = 250;

/** Список поддерживаемых языков приложения. */
export const supportedLangs: string[] = ["ru", "en"];

/** Язык по умолчанию. */
export const defaultLang = "en";

/** Эндпоинты, для которых перехватчик axios не подставляет и не обновляет токен авторизации. */
export const refreshIgnoreEndpoints = ["/auth/login", "/auth/refresh", "/auth/register"];
