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
    getUserAction,
    updateUserInfoAction,
} from "../../services/actions/users";

const ProfilePage = function () {
    const { user } = useSelector((store) => store.users);
    const dispatch = useDispatch();

    const { getUser } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    const [isInfoChanged, setIsInfoChanged] = React.useState(false);

    const [userInfo, setUserInfo] = React.useState({
        email: user.email,
        name: user.name,
        password: "",
    });

    const onChangeField = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
        setIsInfoChanged(true);
    };

    const onCancelClick = (e) => {
        dispatch(getUserAction());
        setUserInfo({
            ...userInfo,
            name: user.name,
            email: user.email,
        });
        setIsInfoChanged(false);
    };

    const onSaveClick = (e) => {
        dispatch(updateUserInfoAction(userInfo.email, userInfo.name));
        setIsInfoChanged(false);
    };

    return (
        <div className={styles.wrapper}>
            <SideNavigation />
            <div className={styles.inputForm}>
                <Input
                    extraClass='mb-6'
                    icon='EditIcon'
                    name='name'
                    value={userInfo.name}
                    onChange={onChangeField}
                    placeholder={"Имя"}
                />
                <EmailInput
                    extraClass='mb-6'
                    icon='EditIcon'
                    name='email'
                    value={userInfo.email}
                    onChange={onChangeField}
                    placeholder={"Логин"}
                />
                <PasswordInput
                    extraClass='mb-6'
                    icon='EditIcon'
                    placeholder='Пароль'
                    name='password'
                    value={userInfo.password}
                    onChange={onChangeField}
                />
                {isInfoChanged && (
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
                )}
            </div>
        </div>
    );
};
export { ProfilePage };
