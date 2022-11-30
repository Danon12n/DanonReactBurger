import { FC, useEffect } from "react";
import { logoutUserAction } from "../../services/actions/users";
import { Redirect } from "react-router-dom";
const LogoutPage: FC = () => {
    useEffect(() => {
        logoutUserAction();
    }, []);
    return <Redirect to='/login' />;
};
export { LogoutPage };
