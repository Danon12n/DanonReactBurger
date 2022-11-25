// import styles from "./not-found-page.module.scss";
import { Redirect } from "react-router-dom";
import { FC } from "react";

const NotFoundPage: FC = () => {
    return <Redirect to='/' />;
};
export { NotFoundPage };
