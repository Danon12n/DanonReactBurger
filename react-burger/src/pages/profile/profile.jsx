import styles from "./profile.module.css";
import React, { useEffect } from "react";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SideNavigation } from "../../components/side-navigation/side-navigation";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import {
    boundUser,
    getUserAction,
    updateUserInfoAction,
} from "../../services/actions/users";

const ProfilePage = function () {
    const { user } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    const [password, setPassword] = React.useState("");

    const { getUser } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    const onChangeEmail = (e) => {
        dispatch(boundUser.setUserEmail(e.target.value));
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeName = (e) => {
        dispatch(boundUser.setUserName(e.target.value));
    };

    const onCancelClick = (e) => {
        dispatch(getUserAction());
    };

    const onSaveClick = (e) => {
        dispatch(updateUserInfoAction(user.email, user.name));
    };

    return (
        <div className={styles.wrapper}>
            <SideNavigation />
            <div className={styles.inputForm}>
                <Input
                    extraClass='mb-6'
                    icon='EditIcon'
                    name='name'
                    value={user.name}
                    onChange={onChangeName}
                    placeholder={"Имя"}
                />
                <EmailInput
                    extraClass='mb-6'
                    icon='EditIcon'
                    name='email'
                    value={user.email}
                    onChange={onChangeEmail}
                    placeholder={"Логин"}
                />
                <PasswordInput
                    extraClass='mb-6'
                    icon='EditIcon'
                    placeholder='Пароль'
                    name='password'
                    value={password}
                    onChange={onChangePassword}
                />
                <div className={styles.buttonsWrapper}>
                    <Button
                        onClick={onCancelClick}
                        type='secondary'
                        htmlType='button'
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={onSaveClick}
                        type='primary'
                        htmlType='button'
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    );
};
export { ProfilePage };
