import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyles from "./app-header.module.css";

import NavItem from "./nav-item/nav-item";

const NavItems = [
    {
        icon: <BurgerIcon type='secondary' />,
        text: "Конструкторная",
        path: "/",
    },
    {
        icon: <ListIcon type='secondary' />,
        text: "Лента заказов",
        path: "/feed",
    },
];
const AppHeader = () => {
    return (
        <header className={AppHeaderStyles.header}>
            <nav className={AppHeaderStyles.navigation}>
                {NavItems.map((elem, i) => {
                    return <NavItem key={i} {...elem} />;
                })}
            </nav>
            <div className={AppHeaderStyles.logo}>
                <Logo />
            </div>
            <NavItem
                {...{
                    icon: <ProfileIcon type='secondary' />,
                    text: "Личный кабинет",
                    path: "/profile",
                }}
            ></NavItem>
        </header>
    );
};

export default AppHeader;
