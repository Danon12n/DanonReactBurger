import styles from "./forgot-password.module.css";
import { Link } from "react-router-dom";
import { ResetPassword } from "../../utils/user-api";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import { boundUser } from "../../services/actions/users";
import { TStore, TStoreUser } from "../../types/types";

const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = React.useState("");

    const { isCodeSent } = useSelector<TStore, TStoreUser>(
        (store) => store.users
    );

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        ResetPassword({ email: email })
            .then((data) => {
                alert(data.message);
                if (data.success) {
                    console.log("here");
                    boundUser.isCodeSent(true);
                }
            })
            .catch((err) => console.log(err));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return !isCodeSent ? (
        <div className={styles.wrapper}>
            <div className={styles.wrapper}>
                <p className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </p>
                <form className={styles.form} onSubmit={onSubmitForm}>
                    <EmailInput
                        extraClass='mb-6'
                        name='email'
                        value={email}
                        onChange={onChange}
                        placeholder='Укажите e-mail'
                    />

                    <Button htmlType='submit' extraClass='mb-20'>
                        Восстановить
                    </Button>
                </form>
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
        <Redirect to='/reset-password' />
    );
};
export { ForgotPasswordPage };
