import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { logoutUserAction } from "../../services/actions/users";
const LogoutPage = function () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUserAction());
    }, []);
    return <></>;
};
export { LogoutPage };
