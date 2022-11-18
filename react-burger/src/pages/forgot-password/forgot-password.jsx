import styles from "./forgot-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { ResetPassword } from "../../utils/user-api";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { boundUser } from "../../services/actions/users";

const ForgotPasswordPage = function () {
    const [email, setEmail] = React.useState("");

    const onChange = (e) => {
        setEmail(e.target.value);
    };

    const dispatch = useDispatch();

    const resetPass = () => {
        ResetPassword({ email: email })
            .then((data) => {
                alert(data.message);
                if (data.success){
                    dispatch(boundUser.isCodeSent(true));
                } 
            })
            .catch((err) => console.log(err));
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
    return !isCodeSent ? (
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

                <Button
                    onClick={resetPass}
                    htmlType='button'
                    extraClass='mb-20'
                >
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
    ) : (
        <Redirect to='/reset-password' />
    );
};
export { ForgotPasswordPage };
