import styles from "./side-navigation.module.css";
import { NavLink } from "react-router-dom";

const SideNavigation = function () {
    const data = [
        { text: "Профиль", path: "/profile" },
        { text: "История Заказов", path: "/profile/orders" },
        { text: "Выход", path: "/logout" },
    ];
    return (
        <div className={`${styles.wrapper} mr-15`}>
            {data.map((el) => {
                return (
                    <NavLink
                        exact
                        key={el.text}
                        to={{ pathname: el.path }}
                        className={(isActive) => {
                            return `${styles.navItem} ${
                                isActive ? styles.active : ""
                            } text text_type_main-medium pt-5 pb-5`;
                        }}
                    >
                        {el.text}
                    </NavLink>
                );
            })}
            <p className={`${styles.hint} text text_type_main-default mt-20`}>
                В этом разделе вы можете
                <br /> изменить свои персональные данные
            </p>
        </div>
    );
};
export { SideNavigation };
