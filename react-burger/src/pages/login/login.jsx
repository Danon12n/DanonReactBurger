import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { authUserAction } from "../../services/actions/users";
import { useDispatch } from "react-redux";

const LoginPage = function () {
    const [userInfo, setUserInfo] = React.useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const onChageField = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(authUserAction(userInfo));
    };
    const onAuthClick = (e) => {
        dispatch(authUserAction(userInfo));
    };

    return (
        <div className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>Вход</p>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <EmailInput
                    extraClass='mb-6'
                    name='email'
                    value={userInfo.email}
                    onChange={onChageField}
                    placeholder='E-mail'
                />
                <PasswordInput
                    extraClass='mb-6'
                    placeholder='Пароль'
                    name='password'
                    value={userInfo.password}
                    onChange={onChageField}
                />

                <Button
                    onClick={onAuthClick}
                    htmlType='submit'
                    extraClass='mb-20'
                >
                    Войти
                </Button>
            </form>
            <div className={styles.linkWrapper}>
                <p className='text text_type_main-default text_color_inactive'>
                    Вы — новый пользователь?
                </p>
                <Link
                    to={{ pathname: "/register" }}
                    className='text text_type_main-default pl-4 pt-2 pb-2'
                >
                    Зарегистрироваться
                </Link>
            </div>
            <div className={styles.linkWrapper}>
                <p className='text text_type_main-default text_color_inactive'>
                    Забыли пароль?
                </p>
                <Link
                    to={{ pathname: "/forgot-password" }}
                    className='text text_type_main-default pl-4 pt-2 pb-2'
                >
                    Восстановить пароль
                </Link>
            </div>
        </div>
    );
};
export { LoginPage };
