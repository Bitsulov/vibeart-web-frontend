import {describe, it, expect, vi, beforeEach} from "vitest";
import {screen, fireEvent} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {SettingsItem} from "./settingsItem";
import {loadButtonClickHandler} from "../model/loadButtonClickHandler";
import {onChangeLoadHandler} from "../model/onChangeLoadHandler";
import {deleteButtonClickHandler} from "../model/deleteButtonClickHandler";
import {onChangeAvatarLoadHandler} from "../model/onChangeAvatarLoadHandler";
import {deleteAlbumButtonClickHandler} from "../model/deleteAlbumButtonClickHandler";

vi.mock("../model/loadButtonClickHandler", () => ({loadButtonClickHandler: vi.fn()}));
vi.mock("../model/onChangeLoadHandler", () => ({onChangeLoadHandler: vi.fn()}));
vi.mock("../model/deleteButtonClickHandler", () => ({deleteButtonClickHandler: vi.fn()}));
vi.mock("../model/onChangeAvatarLoadHandler", () => ({onChangeAvatarLoadHandler: vi.fn()}));
vi.mock("../model/deleteAlbumButtonClickHandler", () => ({deleteAlbumButtonClickHandler: vi.fn()}));

const setEntityInfo = vi.fn();

const baseProps = {
    title: "Заголовок",
    description: "Описание поля",
    isError: false,
    isSubmitted: false,
    setEntityInfo,
    id: "test-field",
};

describe("SettingsItem - универсальный элемент настроек", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Отображает заголовок и описание", () => {
        renderWithProviders(<SettingsItem {...baseProps} type="input" />);

        expect(screen.getByText("Заголовок")).toBeInTheDocument();
        expect(screen.getByText("Описание поля")).toBeInTheDocument();
    });

    describe("Ввод однострочного текста", () => {
        it("Отображает поле ввода", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="input" />);

            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });
    });

    describe("Ввод многострочного текста", () => {
        it("Отображает текстовое поле", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="textarea" />);

            expect(document.querySelector("textarea")).toBeInTheDocument();
        });
    });

    describe("Ввод идентификатора пользователя", () => {
        it("Отображает поле с префиксом @", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="id" />);

            expect(screen.getByText("@")).toBeInTheDocument();
        });
    });

    describe("Загрузка и удаление изображения", () => {
        it("Отображает кнопки загрузки и удаления", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="buttons" />);

            expect(screen.getByRole("button", {name: "ariaLabel.loadImg"})).toBeInTheDocument();
            expect(screen.getByRole("button", {name: "ariaLabel.deleteImg"})).toBeInTheDocument();
        });

        it("Клик по кнопке загрузки инициирует выбор файла", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="buttons" />);

            fireEvent.click(screen.getByRole("button", {name: "ariaLabel.loadImg"}));

            expect(loadButtonClickHandler).toHaveBeenCalledTimes(1);
        });

        it("Клик по кнопке удаления сбрасывает изображение", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="buttons" />);

            fireEvent.click(screen.getByRole("button", {name: "ariaLabel.deleteImg"}));

            expect(deleteButtonClickHandler).toHaveBeenCalledTimes(1);
        });

        it("Выбор файла обновляет предпросмотр", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="buttons" />);

            const fileInput = document.querySelector("input[type=file]") as HTMLInputElement;
            fireEvent.change(fileInput, {target: {files: []}});

            expect(onChangeLoadHandler).toHaveBeenCalledTimes(1);
        });
    });

    describe("Редактирование аватара", () => {
        it("Отображает кнопки загрузки и удаления", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="avatar" />);

            expect(screen.getByRole("button", {name: "Load"})).toBeInTheDocument();
            expect(screen.getByRole("button", {name: "Delete"})).toBeInTheDocument();
        });

        it("Клик по кнопке загрузки инициирует выбор файла", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="avatar" />);

            fireEvent.click(screen.getByRole("button", {name: "Load"}));

            expect(loadButtonClickHandler).toHaveBeenCalledTimes(1);
        });

        it("Клик по кнопке удаления сбрасывает аватар", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="avatar" />);

            fireEvent.click(screen.getByRole("button", {name: "Delete"}));

            expect(deleteAlbumButtonClickHandler).toHaveBeenCalledTimes(1);
        });

        it("Выбор файла аватара обновляет предпросмотр", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="avatar" />);

            const fileInput = document.querySelector("input[type=file]") as HTMLInputElement;
            fireEvent.change(fileInput, {target: {files: []}});

            expect(onChangeAvatarLoadHandler).toHaveBeenCalledTimes(1);
        });

        it("Отображает заглушку если аватар не задан", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="avatar" avatarUrl="" />);

            expect(screen.queryByRole("img")).not.toBeInTheDocument();
        });

        it("Отображает изображение если аватар задан", () => {
            renderWithProviders(<SettingsItem {...baseProps} type="avatar" avatarUrl="/test.jpg" avatarAlt="аватар" />);

            expect(screen.getByRole("img", {name: "аватар"})).toBeInTheDocument();
        });
    });
});
