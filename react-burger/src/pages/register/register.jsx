import styles from "./register.module.css";
import React from "react";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerUserAction } from "../../services/actions/users";
import { useDispatch } from "react-redux";

const RegisterPage = function () {
    const [userInfo, setUserInfo] = React.useState({
        email: "",
        name: "",
        password: "",
    });

    const dispatch = useDispatch();

    const onChageField = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        dispatch(registerUserAction(userInfo));
    };

    return (
        <div className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>Регистрация</p>
            <form className={styles.form} onSubmit={onSubmitForm}>
                <Input
                    extraClass='mb-6'
                    name='name'
                    value={userInfo.name}
                    onChange={onChageField}
                    placeholder='Имя'
                />
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

                <Button htmlType='submit' extraClass='mb-20'>
                    Зарегистрироваться
                </Button>
            </form>
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
