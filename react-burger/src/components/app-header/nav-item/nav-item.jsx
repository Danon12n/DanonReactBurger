import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import NavItemStyles from "./nav-item.module.css";

export default function NavItem({ props }) {
    return (
        <a href='/' className={NavItemStyles.navItem + " pl-4 pr-4"}>
            {props.icon}
            <p className='text text_type_main-small ml-2'>{props.text}</p>
        </a>
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
