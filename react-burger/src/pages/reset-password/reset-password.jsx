import styles from "./reset-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { SetNewPassword } from "../../utils/user-api";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    Button,
    PasswordInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const ResetPasswordPage = function () {
    const [code, setCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [toggleRedirect, setToggleRedirect] = React.useState(false);
    const onCodeChange = (e) => {
        setCode(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSaveClick = (e) => {
        const newPass = {
            password: password,
            token: code,
        };
        SetNewPassword(newPass)
            .then((data) => {
                alert(data.message);
                setToggleRedirect(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const location = useLocation();
    const { isAuthed, isCodeSent } = useSelector((store) => store.users);

    if (isAuthed) {
        return (
            <Redirect
                // Если объект state не является undefined, вернём пользователя назад.
                to={location.state?.from || "/"}
            />
        );
    }

    if (!isCodeSent) {
        return <Redirect to={"/forgot-password"} />;
    }

    return !toggleRedirect ? (
        <div className={styles.wrapper}>
            <div className={styles.wrapper}>
                <p className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </p>
                <PasswordInput
                    extraClass='mb-6'
                    placeholder='Введите новый пароль'
                    name='password'
                    value={password}
                    onChange={onChangePassword}
                />
                <Input
                    extraClass='mb-6'
                    name='code'
                    value={code}
                    onChange={onCodeChange}
                    placeholder='Введите код из письма'
                />

                <Button
                    onClick={onSaveClick}
                    htmlType='button'
                    extraClass='mb-20'
                >
                    Сохранить
                </Button>
                <div className={styles.linkWrapper}>
                    <p className='text text_type_main-default text_color_inactive'>
                        Вспомнили пароль?
                    </p>
                    <Link
                        to={{ pathname: "/login" }}
                        className='text text_type_main-default pl-4 pt-2 pb-2'
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to='/login' />
    );
};
export { ResetPasswordPage };
