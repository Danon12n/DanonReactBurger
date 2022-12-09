import styles from "./reset-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { setNewPassword } from "../../utils/user-api";
import { useSelector } from "react-redux";
import {
    Button,
    PasswordInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, FC } from "react";
import { TServerAnswer, TStore, TStoreUser } from "../../types/types";
import { useForm } from "../../hooks/useForm";

const ResetPasswordPage: FC = () => {
    const [toggleRedirect, setToggleRedirect] = useState(false);
    const { values, handleChange } = useForm({ password: "", token: "" });

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        setNewPassword(values)
            .then((data: TServerAnswer) => {
                alert(data.message);
                setToggleRedirect(true);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    };

    const { isCodeSent } = useSelector<TStore, TStoreUser>(
        (store) => store.user
    );

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
                        value={values.password}
                        onChange={handleChange}
                    />
                    <Input
                        extraClass='mb-6'
                        name='token'
                        value={values.token}
                        onChange={handleChange}
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
export default ResetPasswordPage;
