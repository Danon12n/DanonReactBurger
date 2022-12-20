import { Route, Redirect, useLocation } from "react-router-dom";
import { FC } from "react";
import { TStore } from "../../types/types";
import { useSelector } from "react-redux";
import { TUserState } from "../../services/reducers/user";

interface IProtectedRouteProps {
    children?: JSX.Element;
    isRequiredAuthed?: boolean;
    path?: string | ReadonlyArray<string> | undefined;
    exact?: boolean;
}

type TLocationState = {
    from: Location;
};

const ProtectedRoute: FC<IProtectedRouteProps> = ({
    children,
    isRequiredAuthed,
    ...rest
}) => {
    const { isAuthed } = useSelector<TStore, TUserState>((store) => store.user);
    const location = useLocation<TLocationState>();

    if (!isRequiredAuthed && isAuthed) {
        const { from } = location.state || { from: { pathname: "/" } };

        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        );
    }

    if (isRequiredAuthed && !isAuthed) {
        return (
            <Route {...rest}>
                <Redirect
                    to={{ pathname: "/login", state: { from: location } }}
                />
            </Route>
        );
    }

    return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
