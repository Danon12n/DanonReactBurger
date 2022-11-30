import { FC, useEffect } from "react";
import { logoutUserAction } from "../../services/actions/users";
const LogoutPage: FC = () => {
    useEffect(() => {
        logoutUserAction();
    }, []);
    return <></>;
};
export { LogoutPage };
