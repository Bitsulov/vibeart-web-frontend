import { useEffect, useState } from "react";

/**
 * Возвращает текущую ширину окна браузера в пикселях.
 * Значение автоматически обновляется при каждом изменении размера окна.
 *
 * @returns Ширина окна в пикселях (`window.innerWidth`).
 */
const useWindowWidth = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};

export { useWindowWidth };
