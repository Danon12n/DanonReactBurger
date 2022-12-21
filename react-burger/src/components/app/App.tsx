import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor/constructor";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookie";
import { boundUser, getUserAction } from "../../services/actions/user";
import { IngredientPage } from "../../pages/ingredient/ingredient";
import { FeedsPage } from "../../pages/feeds/feeds";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { LogoutPage } from "../../pages/logout/logout";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { FeedDetails } from "../feed-details/feed-details";
import { FeedPage } from "../../pages/feed/feed";

//TODOs

/*
    ()  -Перенести хранилище в ts
    ()  -Добавить новые роуты /feed , /feed/:id и /profile/orders/, /profile/orders/:id
    ()  -Реализовать модалки и отдельные страницы с этими роутами как с ингредиентами
    ()  -Оформить реализацию websocket
    ()  -сверстать страницы с лентой заказов и историей заказов
    ()  -подумать как реализовать работу с двумя сокет соединениями
*/

function App() {
    useEffect(() => {
        const accessToken = getCookie("token");
        if (accessToken) {
            boundUser.setAuthed(true);
            getUserAction();
        }
    }, []);

    const location = useLocation<{ background: any }>();
    const history = useHistory();
    let background = location.state && location.state.background;
    return (
        <div className={AppStyles.App}>
            <AppHeader />
            <Switch location={background || location}>
                <Route path='/' exact>
                    <ConstructorPage />
                </Route>
                <ProtectedRoute path='/login'>
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
                <ProtectedRoute isRequiredAuthed path='/profile/orders' exact>
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute
                    isRequiredAuthed
                    path='/profile/orders/:orderNumber'
                    exact
                >
                    <FeedPage />
                </ProtectedRoute>
                <ProtectedRoute isRequiredAuthed path='/logout'>
                    <LogoutPage />
                </ProtectedRoute>
                <Route path='/ingredients/:id'>
                    <IngredientPage />
                </Route>
                <Route path='/feed' exact>
                    <FeedsPage />
                </Route>
                <Route path='/feed/:orderNumber'>
                    <FeedPage />
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>

            <Route path='/ingredients/:id'>
                {background && (
                    <Modal
                        title=''
                        onClose={() => {
                            history.goBack();
                        }}
                    >
                        <IngredientDetails />
                    </Modal>
                )}
            </Route>
            <Route path='/feed/:orderNumber'>
                {background && (
                    <Modal
                        title=''
                        onClose={() => {
                            history.goBack();
                        }}
                    >
                        <FeedDetails />
                    </Modal>
                )}
            </Route>
            <Route path='/profile/orders/:orderNumber'>
                {background && (
                    <Modal
                        title=''
                        onClose={() => {
                            history.goBack();
                        }}
                    >
                        <FeedDetails />
                    </Modal>
                )}
            </Route>
        </div>
    );
}

export default App;
