import { useEffect, useState } from "react";

/** Координаты курсора мыши в пикселях относительно окна просмотра. */
interface IMousePosition {
    /** Горизонтальная координата (ось X). */
    x: number;
    /** Вертикальная координата (ось Y). */
    y: number;
}

/**
 * Отслеживает положение курсора мыши и возвращает его текущие координаты
 * относительно окна просмотра. Обновляется при каждом движении мыши.
 *
 * @returns Объект с полями `x` и `y` — текущие координаты курсора в пикселях.
 */
export const useMousePosition = (): IMousePosition => {
    const [position, setPosition] = useState<IMousePosition>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return position;
}
