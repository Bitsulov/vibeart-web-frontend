import { Check, type LucideIcon, TriangleAlert } from "lucide-react";

/**
 * Соответствие типа всплывающего уведомления иконке из библиотеки Lucide.
 *
 * - `"success"` — операция выполнена успешно (галочка).
 * - `"error"` — произошла ошибка (треугольник с восклицательным знаком).
 */
export const toastIconsConfig: Record<string, LucideIcon> = {
    success: Check,
    error: TriangleAlert
};
