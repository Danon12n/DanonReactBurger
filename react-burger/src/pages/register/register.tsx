import styles from "./register.module.css";
import React, { FC } from "react";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerUserAction } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";

const RegisterPage: FC = () => {
    const { values, handleChange } = useForm({
        email: "",
        name: "",
        password: "",
    });

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        registerUserAction(values);
    };

    return (
        <div className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>Регистрация</p>
            <form className={styles.form} onSubmit={onSubmitForm}>
                <Input
                    extraClass='mb-6'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    placeholder='Имя'
                />
                <EmailInput
                    extraClass='mb-6'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    placeholder='E-mail'
                />
                <PasswordInput
                    extraClass='mb-6'
                    placeholder='Пароль'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
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
