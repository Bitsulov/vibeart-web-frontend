import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {ChatItem} from "./chatItem";
import {screen} from "@testing-library/react";

const defaultProps = {
    UUID: "00000000-0000-4000-8000-000000000001",
    title: "Иван",
    imageUrl: "https://example.com/avatar.jpg",
    lastMessage: "Привет! Как дела?",
    date: "2026-04-11T12:00:00.000Z",
};

describe("ChatItem - элемент списка чатов", () => {
    it("Рендерит ссылку с корректным aria-label", () => {
        renderWithProviders(<ChatItem {...defaultProps} />);

        expect(
            screen.getByRole("link", {name: "ariaLabel.goToChat"})
        ).toBeInTheDocument();
    });

    it("Ссылка ведёт на страницу чата по UUID", () => {
        renderWithProviders(<ChatItem {...defaultProps} />);

        expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            `/chats/${defaultProps.UUID}`
        );
    });

    it("Отображает имя собеседника", () => {
        renderWithProviders(<ChatItem {...defaultProps} />);

        expect(screen.getByRole("heading", {level: 2, name: "Иван"})).toBeInTheDocument();
    });

    it("Отображает текст последнего сообщения", () => {
        renderWithProviders(<ChatItem {...defaultProps} />);

        expect(screen.getByText("Привет! Как дела?")).toBeInTheDocument();
    });

    it("Отображает аватар с переданным src", () => {
        renderWithProviders(<ChatItem {...defaultProps} />);

        expect(screen.getByRole("img")).toHaveAttribute("src", defaultProps.imageUrl);
    });

    it("Использует дефолтный аватар при пустом imageUrl", () => {
        renderWithProviders(<ChatItem {...defaultProps} imageUrl="" />);

        const img = screen.getByRole("img");
        expect(img.getAttribute("src")).toBeTruthy();
    });
});
