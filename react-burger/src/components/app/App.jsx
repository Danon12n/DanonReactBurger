import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor/constructor";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { TestPage } from "../../pages/test/test";
import { ProtectedRoute } from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookie";
import { boundUser, getUserAction } from "../../services/actions/users";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = getCookie("token");
        if (accessToken !== null && accessToken !== undefined) {
            dispatch(boundUser.setAuthed(true));
            dispatch(getUserAction());
        }
    }, [dispatch]);
    return (
        <Router>
            <div className={AppStyles.App}>
                <AppHeader />
                <Switch>
                    <Route path='/' exact>
                        <ConstructorPage />
                    </Route>
                    <Route path='/login' exact>
                        <LoginPage />
                    </Route>
                    <Route path='/register' exact>
                        <RegisterPage />
                    </Route>
                    <Route path='/forgot-password' exact>
                        <ForgotPasswordPage />
                    </Route>
                    <Route path='/reset-password' exact>
                        <ResetPasswordPage />
                    </Route>
                    <ProtectedRoute path='/profile' exact>
                        <ProfilePage />
                    </ProtectedRoute>

                    <Route path='/test' exact>
                        <TestPage />
                    </Route>
                    <Route path='/ingredients/:id' exact></Route>
                    <Route>
                        <p>404 PAGE</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
