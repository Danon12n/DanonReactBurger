import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SideNavigation } from "../../components/side-navigation/side-navigation";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
    getUserAction,
    updateUserInfoAction,
} from "../../services/actions/users";
import { OrdersHistory } from "../../components/orders-history/orders-history";

const ProfilePage = function () {
    const { user } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { getUser } = useAuth();

    useEffect(() => {
        getUser();
    }, []);

    const [option, setOption] = useState("");
    const [isInfoChanged, setIsInfoChanged] = useState(false);

    const [userInfo, setUserInfo] = useState({
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
        setOption("cancel");
    };

    const onSaveClick = (e) => {
        setOption("save");
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        switch (option) {
            case "save":
                if (userInfo.password === "") {
                    setUserInfo({
                        email: userInfo.email,
                        name: userInfo.name,
                    });
                }
                dispatch(updateUserInfoAction(userInfo));
                setIsInfoChanged(false);
                break;
            case "cancel":
                dispatch(getUserAction());
                setUserInfo({
                    ...userInfo,
                    name: user.name,
                    email: user.email,
                });
                setIsInfoChanged(false);
                break;

            default:
                break;
        }
    };

    return (
        <div className={styles.wrapper}>
            <SideNavigation />
            {pathname === "/profile/orders" ? (
                <OrdersHistory></OrdersHistory>
            ) : (
                <div className={styles.inputForm}>
                    <form onSubmit={onFormSubmit}>
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
                                    type='secondary'
                                    htmlType='submit'
                                    name='cancel'
                                    onClick={onCancelClick}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    name='save'
                                    onClick={onSaveClick}
                                >
                                    Сохранить
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};
export { ProfilePage };
