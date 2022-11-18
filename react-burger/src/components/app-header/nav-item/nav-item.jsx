import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavItemStyles from "./nav-item.module.css";

export default function NavItem({ props }) {
    return (
        <Link
            to={{ pathname: props.path }}
            className={NavItemStyles.navItem + " pl-4 pr-4"}
        >
            {props.icon}
            <p className='text text_type_main-small ml-2'>{props.text}</p>
        </Link>
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
