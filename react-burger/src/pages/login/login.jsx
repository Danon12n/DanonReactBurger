import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import React from "react";
import { authUserAction } from "../../services/actions/users";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = function () {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { isAuthed } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    const location = useLocation();
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onAuthClick = (e) => {
        const userInfo = {
            email: email,
            password: password,
        };
        dispatch(authUserAction(userInfo));
    };

    if (isAuthed) {
        console.log(location.state?.from);
        return (
            <Redirect
                // Если объект state не является undefined, вернём пользователя назад.
                to={location.state?.from || "/"}
            />
        );
    }
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

            <Button onClick={onAuthClick} htmlType='button' extraClass='mb-20'>
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

// pages/login.jsx
// Импортируем все необходимые компоненты
// export function LoginPage() {
//     let auth = useAuth();

//     const [form, setValue] = useState({ email: '', password: '' });

//     const onChange = e => {
//       setValue({ ...form, [e.target.name]: e.target.value });
//     };

//     let login = useCallback(
//       e => {
//         e.preventDefault();
//         auth.signIn(form);
//       },
//       [auth, form]
//     );

//     if (auth.user) {
//       return (
//         <Redirect
//                   // Если объект state не является undefined, вернём пользователя назад.
//           to={ state?.from || '/' }
//         />
//       );
//     }

//     return (
//         // ...
//     );
//   }
