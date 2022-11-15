import styles from "./reset-password.module.css";
import { Link } from "react-router-dom";
import {
    Button,
    PasswordInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const ResetPasswordPage = function () {
    const [code, setCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onCodeChange = (e) => {
        setCode(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    return (
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

                <Button htmltype='button' extraClass='mb-20'>
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
    );
};
export { ResetPasswordPage };
