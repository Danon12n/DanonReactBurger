// import styles from "./not-found-page.module.scss";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../services/actions/users";

const NotFoundPage = function () {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    if (pathname === "/logout") {
        dispatch(logoutUserAction());
    }
    return <Redirect to='/' />;
};
export { NotFoundPage };
