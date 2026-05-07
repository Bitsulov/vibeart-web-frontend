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

/** Страница создания альбома с live-preview обложки и формой заполнения данных. */
export const CreateAlbum = () => {
    const { t } = useTranslation();
    const [albumInfo, setAlbumInfo] = useState<Partial<AlbumType>>({});

    const [selectedAlbum, setSelectedAlbum] = useState<string>("all");

    const [loadedFile, setLoadedFile] = useState<File>();
    const [isErrorImg, setIsErrorImg] = useState<boolean>(false);

    useEffect(() => {
        if(loadedFile) {
            setIsErrorImg(false);
        }
    }, [loadedFile]);

	return (
		<Layout>
            <title>{t("titles.albumCreate")}</title>
            <meta name="description" content={t("description.albumCreate")} />
            <section className={c.content}>
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
                            onSubmit={() => onSubmitForm(loadedFile, setIsErrorImg)}
                        />
                    </div>
                </div>
            </section>
		</Layout>
	)
}
