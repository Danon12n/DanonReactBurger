import styles from "./register.module.css";
import React from "react";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const RegisterPage = function () {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    return (
        <div className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>Регистрация</p>
            <Input
                extraClass='mb-6'
                name='firstName'
                value={firstName}
                onChange={onFirstNameChange}
                placeholder='Имя'
            />
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
                Зарегистрироваться
            </Button>
            <div className={styles.linkWrapper}>
                <p className='text text_type_main-default text_color_inactive'>
                    Уже зарегистрированы?
                </p>
                <Link
                    to={{ pathname: "/login" }}
                    className='text text_type_main-default pl-4 pt-2 pb-2'
                >
                    Войти
                </Link>
            </div>
        </div>
    );
};
export { RegisterPage };
