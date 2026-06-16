import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CookiesModal } from "./cookiesModal";

describe("CookiesModal - модальное окно уведомления о куки", () => {
    it("Не рендерится при isShow=false", () => {
        renderWithProviders(<CookiesModal isShow={false} setIsShow={vi.fn()} />);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Отображает диалог при isShow=true", () => {
        renderWithProviders(<CookiesModal isShow={true} setIsShow={vi.fn()} />);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Вызывает setIsShow при нажатии кнопки принятия", async () => {
        const setIsShow = vi.fn();
        renderWithProviders(<CookiesModal isShow={true} setIsShow={setIsShow} />);
        await userEvent.click(
            screen.getByRole("button", { name: "ariaLabel.acceptCookies" })
        );
        expect(setIsShow).toHaveBeenCalledWith(false);
    });
});
