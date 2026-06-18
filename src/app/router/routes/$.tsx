import { data } from "react-router";

export function loader() {
    return data(null, { status: 404 });
}

export { Error as default } from "pages/error";
