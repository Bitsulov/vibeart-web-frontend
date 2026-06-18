import { useEffect, useState } from "react";

/**
 * Возвращает текущее состояние CSS медиазапроса.
 * Значение обновляется при изменении совпадения запроса.
 *
 * @param query - CSS медиазапрос, например `"(width >= 1200px)"`.
 * @returns `true`, если медиазапрос совпадает, иначе `false`.
 */
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(query);
        setMatches(mq.matches);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [query]);

    return matches;
};

export { useMediaQuery };
