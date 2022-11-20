import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({ children, isRequiredAuthed, ...rest }) {
    const { isAuthed, user } = useSelector((store) => store.users);

    if (isAuthed && !user) {
        return <p>Loading...</p>;
    }

    const pathname = isRequiredAuthed ? "/login" : "/";
    const condition = isRequiredAuthed ? isAuthed : !isAuthed;

    return (
        <Route
            {...rest}
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
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    isRequiredAuthed: PropTypes.bool,
    rest: PropTypes.object,
};

ProtectedRoute.defaultProps = {
    isRequiredAuthed: false,
};
