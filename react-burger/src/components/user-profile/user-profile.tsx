import { FC, useEffect, useState } from "react";
import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { TStore, TStoreUser, TUserInfo } from "../../types/types";
import {
    getUserAction,
    updateUserInfoAction,
} from "../../services/actions/user";
import styles from "./user-profile.module.css";

interface IUserProfileProps {}

const UserProfile: FC<IUserProfileProps> = ({}) => {
    const { user } = useSelector<TStore, TStoreUser>((store) => store.user);
    const [option, setOption] = useState("");
    const [isInfoChanged, setIsInfoChanged] = useState(false);

    const [userInfo, setUserInfo] = useState<TUserInfo>({
        email: "",
        name: "",
        password: "",
    });

    useEffect(() => {
        getUserAction();
    }, []);

    useEffect(() => {
        setUserInfo({
            email: user?.email,
            name: user?.name,
        });
    }, [user?.name, user?.email]);

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
        setIsInfoChanged(true);
    };

    const onCancelClick = () => {
        setOption("cancel");
    };

    const onSaveClick = () => {
        setOption("save");
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        switch (option) {
            case "save":
                if (userInfo.password === "") {
                    setUserInfo({
                        email: userInfo.email,
                        name: userInfo.name,
                    });
                }
                updateUserInfoAction(userInfo);
                setIsInfoChanged(false);
                break;
            case "cancel":
                getUserAction();
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
                <Input
                    extraClass='mb-6'
                    inputMode='email'
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
                    value={
                        userInfo.password === undefined ? "" : userInfo.password
                    }
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
    );
};
export { UserProfile };
