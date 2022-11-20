import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./nav-item.module.css";

export default function NavItem({ props }) {
    return (
        <NavLink
            exact
            to={{ pathname: props.path }}
            className={(isActive) =>
                `${styles.navItem} ${isActive ? styles.active : ""} pl-4 pr-4`
            }
        >
            {props.icon}
            <p className='text text_type_main-small ml-2'>{props.text}</p>
        </NavLink>
    );
}

NavItem.defaultProps = {
    icon: <CheckMarkIcon type='primary' />,
    text: "ТекстНавигации",
};

NavItem.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
};
