import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { FooterEmailLink } from "./footerEmailLink";

describe("FooterEmailLink — ссылка на электронную почту в футере с кнопкой копирования", () => {
    it("Отображает ссылку на email", () => {
        renderWithProviders(<FooterEmailLink />);

        expect(screen.getByRole("link", { name: "ariaLabel.goToEmail" })).toBeInTheDocument();
    });

    it("Ссылка ведёт на mailto", () => {
        renderWithProviders(<FooterEmailLink />);

        const link = screen.getByRole("link", { name: "ariaLabel.goToEmail" });

        expect(link).toHaveAttribute("href", expect.stringContaining("mailto:"));
    });

    it("Отображает кнопку копирования", () => {
        renderWithProviders(<FooterEmailLink />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});
