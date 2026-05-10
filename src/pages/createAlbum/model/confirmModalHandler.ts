import type {NavigateFunction} from "react-router-dom";

export function confirmModalHandler(navigate: NavigateFunction) {
    navigate("/gallery", {replace: true});
}
