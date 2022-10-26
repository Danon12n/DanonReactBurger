import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./custom-constructor-element.module.css";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { useDrag } from "react-dnd/dist/hooks/useDrag/useDrag";
import { boundBurgerConstructorActions } from "../../../services/actions/burger-constructor";
import { boundBurgerIngredientsActions } from "../../../services/actions/burger-ingredients";

export default function CustomConstructorElement({
    isBun,
    position,
    index,
    ingredient,
}) {
    const deleteIngredient = (e) => {
        boundBurgerConstructorActions.deleteIngredient(index);
        boundBurgerIngredientsActions.decreaseCounter(ingredient._id);
    };
    const ref = useRef();

    const [{ handlerId }, drop] = useDrop({
        accept: "sort",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            boundBurgerConstructorActions.swapIngredients({
                dragIndex: dragIndex,
                hoverIndex: hoverIndex,
            });
            item.index = hoverIndex;
        },
    });
    const [{}, drag] = useDrag({
        type: "sort",
        item: () => {
            return { index };
        },
    });
    drag(drop(ref));

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
        <div
            className={styles.BurgerPartWrapper}
            ref={ref}
            data-handler-id={handlerId}
        >
            <DragIcon />
            <ConstructorElement
                extraClass='ml-2'
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={deleteIngredient}
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
    ingredient: PropTypes.object.isRequired,
};
