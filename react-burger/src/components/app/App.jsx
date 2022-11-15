import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor/constructor";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";

function App() {
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
                    <Route path='/profile' exact>
                        <ProfilePage />
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
