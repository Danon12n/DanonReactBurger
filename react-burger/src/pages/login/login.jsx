import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import React from "react";

const LoginPage = function () {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    return (
        <div className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>Вход</p>
            <EmailInput
                extraClass='mb-6'
                name='email'
                value={email}
                onChange={onChange}
                placeholder='E-mail'
            />
            <PasswordInput
                extraClass='mb-6'
                placeholder='Пароль'
                name='password'
                value={password}
                onChange={onChangePassword}
            />

            <Button htmltype='button' extraClass='mb-20'>
                Войти
            </Button>
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
