import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./custom-constructor-element.module.css";
import PropTypes from "prop-types";

export default function CustomConstructorElement({
    isBun,
    position,
    ingredient,
}) {
    return isBun ? (
        <ConstructorElement
            extraClass={`ml-8  ${position === "top" ? "mb-4" : "mt-4"}`}
            text={`${ingredient.name} ${
                position === "top" ? "(верх)" : "(низ)"
            }`}
            price={ingredient.price}
            thumbnail={ingredient.image}
            type={position}
            isLocked={true}
        />
    ) : (
        <div className={styles.BurgerPartWrapper}>
            <DragIcon />
            <ConstructorElement
                extraClass='ml-2'
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
            />
        </div>
    );
}

CustomConstructorElement.defaultProps = {
    isBun: false,
    position: "top",
    ingredient: {},
};

CustomConstructorElement.propTypes = {
    isBun: PropTypes.bool.isRequired,
    position: PropTypes.string,
    ingredient: PropTypes.object,
};
