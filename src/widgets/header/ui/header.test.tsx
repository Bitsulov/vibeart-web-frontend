import { vi, expect, describe, it, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { Header } from "./header";
import { useWindowWidth } from "shared/hooks/useWindowWidth";

vi.mock("shared/hooks/useWindowWidth", () => ({
    useWindowWidth: vi.fn()
}));

const defaultProps = {
    setIsShowChangeLanguage: vi.fn(),
    isShowChangeLanguage: false,
    languagesConfig: { ru: ["", "", "", ""] }
};

describe("Header - заголовок страницы", () => {
    beforeEach(() => {
        vi.mocked(useWindowWidth).mockReturnValue(375);
    });

    it("Отображает заголовок главной страницы по маршруту /ru/", () => {
        renderWithProviders(<Header {...defaultProps} />, { route: "/ru/" });
        expect(screen.getByText("pages.home")).toBeInTheDocument();
    });

    it("Отображает заголовок главной страницы по маршруту /ru (без слеша)", () => {
        renderWithProviders(<Header {...defaultProps} />, { route: "/ru" });
        expect(screen.getByText("pages.home")).toBeInTheDocument();
    });
});

describe("Header - адаптация при разной ширине экрана", () => {
    describe("Мобильная версия (< 1200px)", () => {
        beforeEach(() => {
            vi.mocked(useWindowWidth).mockReturnValue(375);
        });

        it("Отображает кнопку бургера", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(
                screen.getByRole("button", { name: "ariaLabel.openBurgerMenu" })
            ).toBeInTheDocument();
        });

        it("Не отображает ссылку на email", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(
                screen.queryByRole("link", { name: "ariaLabel.goToEmail" })
            ).not.toBeInTheDocument();
        });

        it("Отображает меню бургера", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(document.getElementById("burgerMenu")).toBeInTheDocument();
        });
    });

    describe("Десктопная версия (> 1200px)", () => {
        beforeEach(() => {
            vi.mocked(useWindowWidth).mockReturnValue(1440);
        });

        it("Не отображает кнопку бургера", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(
                screen.queryByRole("button", { name: "ariaLabel.openBurgerMenu" })
            ).not.toBeInTheDocument();
        });

        it("Отображает ссылку на email", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(
                screen.getByRole("link", { name: "ariaLabel.goToEmail" })
            ).toBeInTheDocument();
        });

        it("Не отображает меню бургера", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(document.getElementById("burgerMenu")).not.toBeInTheDocument();
        });

        it("Отображает кнопку профиля вместо бургера", () => {
            renderWithProviders(<Header {...defaultProps} />);

            expect(
                screen.getByRole("link", { name: "ariaLabel.goToAuth" })
            ).toBeInTheDocument();
        });
    });
});
