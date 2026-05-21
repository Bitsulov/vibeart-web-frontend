import {describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunityUserItem} from "./communityUserItem";

const defaultProps = {
    imageUrl: "",
    name: "Alice Wonder",
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
};

describe("CommunityUserItem - элемент списка пользователей сообщества", () => {
    it("Отображает имя пользователя", () => {
        renderWithProviders(<CommunityUserItem {...defaultProps} />);

        expect(screen.getByText("Alice Wonder")).toBeInTheDocument();
    });

    it("Ссылка ведёт на страницу профиля пользователя", () => {
        renderWithProviders(<CommunityUserItem {...defaultProps} />);

        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("href", `/profile/${defaultProps.ULID}`);
    });

    it("Отображает аватар с корректным alt", () => {
        renderWithProviders(<CommunityUserItem {...defaultProps} imageUrl="avatar.jpg" />);

        expect(screen.getByAltText("Alice Wonder")).toBeInTheDocument();
    });
});
