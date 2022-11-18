import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
    const { isAuthed, user } = useSelector((store) => store.users);

    if (isAuthed && !user) {
        return <p>Loading...</p>;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthed ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
