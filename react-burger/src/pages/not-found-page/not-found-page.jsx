// import styles from "./not-found-page.module.scss";
import { Redirect } from "react-router-dom";

const NotFoundPage = function () {
    return <Redirect to='/' />;
};
export { NotFoundPage };
