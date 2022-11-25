import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor/constructor";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookie";
import { boundUser, getUserAction } from "../../services/actions/users";
import { IngredientPage } from "../../pages/ingredient/ingredient";
import { OrdersLinePage } from "../../pages/orders-line/orders";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { LogoutPage } from "../../pages/logout/logout";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = getCookie("token");
        if (accessToken) {
            boundUser.setAuthed(true);
            getUserAction();
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
                    <ProtectedRoute path='/login' exact>
                        <LoginPage />
                    </ProtectedRoute>
                    <ProtectedRoute path='/register' exact>
                        <RegisterPage />
                    </ProtectedRoute>
                    <ProtectedRoute path='/forgot-password' exact>
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                    <ProtectedRoute path='/reset-password' exact>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                    <ProtectedRoute isRequiredAuthed path='/profile' exact>
                        <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute
                        isRequiredAuthed
                        path='/profile/orders'
                        exact
                    >
                        <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute isRequiredAuthed path='/logout'>
                        <LogoutPage />
                    </ProtectedRoute>
                    <ProtectedRoute isRequiredAuthed path='/orders' exact>
                        <OrdersLinePage />
                    </ProtectedRoute>
                    <Route path='/ingredients/:id' exact>
                        <IngredientPage />
                    </Route>

                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
