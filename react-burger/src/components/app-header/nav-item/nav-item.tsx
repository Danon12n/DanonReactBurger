import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./nav-item.module.css";
import { FC } from "react";

interface INavItemProps {
    activeIcon: React.ReactElement;
    icon: React.ReactElement;
    text: string;
    path: string;
}

const NavItem: FC<INavItemProps> = ({ activeIcon, icon, text, path }) => {
    const match = useRouteMatch({ path: path, exact: true });
    return (
        <NavLink
            exact
            to={{ pathname: path }}
            className={(isActive) =>
                `${styles.navItem} ${isActive ? styles.active : ""} pl-4 pr-4`
            }
        >
            {match ? activeIcon : icon}
            <p className='text text_type_main-small ml-2'>{text}</p>
        </NavLink>
    );
};

export default NavItem;
