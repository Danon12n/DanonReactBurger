import {
    authUserAction,
    getUserAction,
    logoutUserAction,
} from "../services/actions/users";
import { useDispatch } from "react-redux";

export function useAuth() {
    const dispatch = useDispatch();
    //функция для авторизации пользователя
    const signIn = async (form) => {
        return await authUserAction(form);
    };

    //функция для деавторизации пользователя
    const signOut = async () => {
        return await logoutUserAction();
    };

    //функция для полученния данных об авторизованном пользователе с сервера
    const getUser = async () => {
        return await dispatch(getUserAction());
    };

    return {
        signIn,
        signOut,
        getUser,
    };
}
