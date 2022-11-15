import styles from "./forgot-password.module.css";
import { Link } from "react-router-dom";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const ForgotPasswordPage = function () {
    const [email, setEmail] = React.useState("");
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper}>
                <p className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </p>
                <EmailInput
                    extraClass='mb-6'
                    name='email'
                    value={email}
                    onChange={onChange}
                    placeholder='Укажите e-mail'
                />

                <Button htmltype='button' extraClass='mb-20'>
                    Восстановить
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
export { ForgotPasswordPage };
