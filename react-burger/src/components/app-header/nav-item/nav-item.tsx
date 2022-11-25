import { NavLink } from "react-router-dom";
import styles from "./nav-item.module.css";
import { FC } from "react";

interface INavItemProps {
    icon: React.ReactElement;
    text: string;
    path: string;
}

const NavItem: FC<INavItemProps> = ({ icon, text, path }) => {
    return (
        <NavLink
            exact
            to={{ pathname: path }}
            className={(isActive) =>
                `${styles.navItem} ${isActive ? styles.active : ""} pl-4 pr-4`
            }
        >
            {icon}
            <p className='text text_type_main-small ml-2'>{text}</p>
        </NavLink>
    );
};

export default NavItem;
