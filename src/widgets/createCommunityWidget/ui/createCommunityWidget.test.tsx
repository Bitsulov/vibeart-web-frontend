import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CreateCommunityWidget } from "./createCommunityWidget";
import { principalUserMock } from "entities/user";
import { communityTagsMock } from "entities/tag";

const defaultProps = {
    userInfo: principalUserMock,
    tagsList: communityTagsMock,
    communityInfo: {},
    setCommunityInfo: vi.fn()
};

describe("CreateCommunityWidget - форма создания сообщества", () => {
    it("Отображает настройку аватара", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.avatarTitle")).toBeInTheDocument();
    });

    it("Отображает настройку названия", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.nameTitle")).toBeInTheDocument();
    });

    it("Отображает настройку описания", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.textTitle")).toBeInTheDocument();
    });

    it("Отображает настройку уникального id", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.idTitle")).toBeInTheDocument();
    });

    it("Отображает настройку добавления администраторов", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.adminsTitle")).toBeInTheDocument();
    });

    it("Отображает кнопку отправки формы", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.saveCommunity" })
        ).toBeInTheDocument();
    });

    it("Поле id содержит префикс @", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("@")).toBeInTheDocument();
    });
});
