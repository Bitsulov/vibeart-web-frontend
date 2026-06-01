import c from "./createAlbum.module.scss";
import {Layout} from "widgets/layout";
import {useTranslation} from "react-i18next";
import {BackLink} from "features/backLink";
import {AlbumSlide} from "features/albumSlide";
import {useEffect, useState} from "react";
import type {AlbumType} from "entities/album";
import {CreateAlbumWidget} from "widgets/createAlbumWidget";
import {onSubmitForm} from "../model/onSubmitForm";
import clsx from "clsx";
import {ConfirmModal} from "widgets/confirmModal";
import {openModalHandler} from "../model/openModalHandler";
import {confirmModalHandler} from "../model/confirmModalHandler";
import {useNavigate} from "react-router-dom";

/**
 * Страница создания альбома с живым предпросмотром обложки и формой заполнения данных.
 *
 * Если изображение не загружено, при отправке формы вместо создания альбома открывается
 * {@link ConfirmModal} с предложением продолжить без обложки.
 * Ошибка изображения (`isErrorImg`) сбрасывается автоматически при выборе файла.
 */
export const CreateAlbum = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [albumInfo, setAlbumInfo] = useState<Partial<AlbumType>>({});

    const [selectedAlbum, setSelectedAlbum] = useState<string>("all");

    const [loadedFile, setLoadedFile] = useState<File>();
    const [isErrorImg, setIsErrorImg] = useState<boolean>(false);

    useEffect(() => {
        if(loadedFile) {
            setIsErrorImg(false);
        }
    }, [loadedFile]);

    const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
    const submitFn = loadedFile
        ? (navigation: () => void) => onSubmitForm(navigation, loadedFile, setIsErrorImg)
        : (_navigation: () => void) => openModalHandler(setIsShowConfirm);

	return (
		<Layout>
            <title>{t("titles.albumCreate")}</title>
            <meta name="description" content={t("description.albumCreate")} />
            <meta property="og:title" content={t("titles.albumCreate")} />
            <meta property="og:description" content={t("description.albumCreate")} />
            <section className={c.content}>
                <ConfirmModal
                    text={t("modal.confirmCreateAlbumEmptyImg")}
                    ariaLabelConfirm={t("ariaLabel.confirmCreateAlbumModal")}
                    confirmFn={() => confirmModalHandler(navigate)}
                    isShowModal={isShowConfirm}
                    setIsShowModal={setIsShowConfirm}
                />
                <div className="container">
                    <div className={c.content_inner}>
                        <BackLink className={c.back} />
                        <AlbumSlide
                            imageUrl={albumInfo.imageUrl ?? ""}
                            name={albumInfo.name ?? ""}
                            ULID={albumInfo.ULID ?? ""}
                            className={clsx(c.item, isErrorImg && c.error)}
                            selectedAlbum={selectedAlbum}
                            setSelectedAlbum={setSelectedAlbum}
                            animateName
                        />
                        <CreateAlbumWidget
                            setAlbumInfo={setAlbumInfo}
                            setLoadedFile={setLoadedFile}
                            loadedFile={loadedFile}
                            onSubmit={submitFn}
                            setIsErrorImg={setIsErrorImg}
                        />
                    </div>
                </div>
            </section>
		</Layout>
	)
}
