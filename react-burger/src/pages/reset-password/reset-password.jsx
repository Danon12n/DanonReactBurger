import styles from "./reset-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { SetNewPassword } from "../../utils/user-api";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    PasswordInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const ResetPasswordPage = function () {
    const [toggleRedirect, setToggleRedirect] = React.useState(false);
    const [newPass, setNewPass] = React.useState({
        password: "",
        token: "",
    });
    const dispatch = useDispatch();

    const onChageField = (e) => {
        setNewPass({
            ...newPass,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        dispatch(
            SetNewPassword(newPass)
                .then((data) => {
                    alert(data.message);
                    setToggleRedirect(true);
                })
                .catch((err) => {
                    console.log(err);
                })
        );
    };

    const { isCodeSent } = useSelector((store) => store.users);

    if (!isCodeSent) {
        return <Redirect to={"/forgot-password"} />;
    }

    return !toggleRedirect ? (
        <div className={styles.wrapper}>
            <div className={styles.wrapper}>
                <p className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </p>
                <form className={styles.form} onSubmit={onSubmitForm}>
                    <PasswordInput
                        extraClass='mb-6'
                        placeholder='Введите новый пароль'
                        name='password'
                        value={newPass.password}
                        onChange={onChageField}
                    />
                    <Input
                        extraClass='mb-6'
                        name='token'
                        value={newPass.token}
                        onChange={onChageField}
                        placeholder='Введите код из письма'
                    />

                    <Button htmlType='submit' extraClass='mb-20'>
                        Сохранить
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
        <Redirect to='/login' />
    );
};
export { ResetPasswordPage };
