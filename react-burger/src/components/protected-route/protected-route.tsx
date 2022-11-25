import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { TStore, TStoreUser } from "../../types/types";

interface IProtectedRouteProps {
    children?: JSX.Element;
    isRequiredAuthed?: boolean;
    path?: string | ReadonlyArray<string> | undefined;
    exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
    children,
    path,
    exact,
    isRequiredAuthed,
}) => {
    const { isAuthed, user } = useSelector<TStore, TStoreUser>(
        (store) => store.users
    );

    if (isAuthed && !user) {
        return <p>Loading...</p>;
    }

    const pathname = isRequiredAuthed ? "/login" : "/";
    const condition = isRequiredAuthed ? isAuthed : !isAuthed;

    return (
        <Route
            path={path}
            exact={exact}
            render={({ location }) =>
                condition ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: pathname,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
