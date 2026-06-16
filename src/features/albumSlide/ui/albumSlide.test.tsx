import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AlbumSlide } from "./albumSlide";

describe("albumSlide - кнопка для выбора текущего выбранного альбома", () => {
    it("Существует на странице", () => {
        const setSelectedAlbum = vi.fn();

        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name=""
                selectedAlbum="1"
                setSelectedAlbum={setSelectedAlbum}
                ariaLabel="button"
                UUID="2"
            />
        );

        const button = screen.getByRole("button", { name: "button" });
        expect(button).toBeInTheDocument();
    });
    it("Выбор альбома", async () => {
        const setSelectedAlbum = vi.fn();

        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name=""
                selectedAlbum="1"
                setSelectedAlbum={setSelectedAlbum}
                ariaLabel="button"
                UUID="2"
            />
        );

        const button = screen.getByRole("button", { name: "button" });

        await userEvent.click(button);
        expect(setSelectedAlbum).toHaveBeenCalledWith("2");
        expect(setSelectedAlbum).toHaveBeenCalledTimes(1);
    });
    it("При UUID === 'all' рендерит текст вместо ссылки", () => {
        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name="Все работы"
                selectedAlbum="all"
                setSelectedAlbum={vi.fn()}
                UUID="all"
            />
        );

        expect(screen.getByText("Все работы")).toBeInTheDocument();
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
    it("Активное состояние применяется когда selectedAlbum совпадает с UUID", () => {
        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name=""
                selectedAlbum="42"
                setSelectedAlbum={vi.fn()}
                ariaLabel="button"
                UUID="42"
            />
        );

        expect(screen.getByRole("button", { name: "button" })).toHaveClass("active");
    });
    it("animateName добавляет класс always_animate на ссылку", () => {
        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name="Альбом"
                selectedAlbum=""
                setSelectedAlbum={vi.fn()}
                UUID="1"
                animateName
            />
        );

        expect(screen.getByRole("link")).toHaveClass("always_animate");
    });
});
