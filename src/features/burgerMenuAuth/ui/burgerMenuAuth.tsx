import c from "./burgerMenuAuth.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "entities/user";
import clsx from "clsx";
import { linksConfig } from "../config/linksConfig";
import { logoutClickHandler } from "../model/logoutClickHandler";
import { useQueryClient } from "@tanstack/react-query";

/** Навигационное меню бургера для авторизованного пользователя. */
export const BurgerMenuAuth = ({ ...props }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const pathSegment = useLocation().pathname.split("/")[2] ?? "";

    const userInfo = useSelector(selectUserInfo);

    return (
        <nav className={c.menu_burger_nav} {...props}>
            {linksConfig.map(item => {
                const resultLink =
                    item.url === "/profile/" ? item.url + userInfo.UUID : item.url;

                if (item.isAdmin) {
                    if (userInfo.role === "ADMIN") {
                        return (
                            <Link
                                key={item.id}
                                to={resultLink}
                                aria-current={
                                    pathSegment === resultLink.split("/")[1]
                                        ? "page"
                                        : undefined
                                }
                                className={clsx(
                                    c.nav_burger_item,
                                    pathSegment === resultLink.split("/")[1] && c.active
                                )}
                                aria-label={t(item.labelKey)}
                            >
                                {t(item.textKey)}
                            </Link>
                        );
                    }
                } else {
                    return (
                        <Link
                            key={item.id}
                            to={resultLink}
                            aria-current={
                                pathSegment === resultLink.split("/")[1]
                                    ? "page"
                                    : undefined
                            }
                            className={clsx(
                                c.nav_burger_item,
                                pathSegment === resultLink.split("/")[1] && c.active
                            )}
                            aria-label={t(item.labelKey)}
                        >
                            {t(item.textKey)}
                        </Link>
                    );
                }
            })}
            <button
                aria-label={t("ariaLabel.logout")}
                onClick={() => logoutClickHandler(navigate, dispatch, queryClient)}
                className={`${c.nav_burger_item} ${c.red}`}
            >
                {t("Logout")}
            </button>
        </nav>
    );
};
