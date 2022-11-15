import styles from "./profile.module.css";
import React from "react";
import {
    PasswordInput,
    EmailInput,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { SideNavigation } from "../../components/side-navigation/side-navigation";

const ProfilePage = function () {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    return (
        <div className={styles.wrapper}>
            <SideNavigation />
            <div className={styles.inputForm}>
                <Input
                    extraClass='mb-6'
                    icon='EditIcon'
                    name='firstName'
                    value={firstName}
                    onChange={onFirstNameChange}
                    placeholder='Имя'
                />
                <EmailInput
                    extraClass='mb-6'
                    icon='EditIcon'
                    name='email'
                    value={email}
                    onChange={onChange}
                    placeholder='Логин'
                />
                <PasswordInput
                    extraClass='mb-6'
                    icon='EditIcon'
                    placeholder='Пароль'
                    name='password'
                    value={password}
                    onChange={onChangePassword}
                />
            </div>
        </div>
    );
};
export { ProfilePage };
