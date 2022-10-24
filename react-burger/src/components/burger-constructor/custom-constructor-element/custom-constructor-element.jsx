import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./custom-constructor-element.module.css";
import PropTypes from "prop-types";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { useDrag } from "react-dnd/dist/hooks/useDrag/useDrag";
import {
    DECREASE_INGREDIENT_COUNTER,
    DELETE_CONSTRUCTOR_INGREDIENT,
    SWAP_CONSTRUCTOR_INGREDIENTS,
} from "../../../services/actions";

export default function CustomConstructorElement({
    isBun,
    position,
    index,
    ingredient,
}) {
    const dispatch = useDispatch();

    //---------------------------------
    // const { filling } = useSelector(
    //     (store) => store.main.ingredientsInConstructor
    // );

    const ref = useRef();
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        // const new_filling = filling.map((el) => {
        //     return el;
        // });
        // const dragCard = new_filling[dragIndex];
        // console.log(dragCard);
        // console.log(new_filling);
        // new_filling.splice(dragIndex, 1);
        // console.log(new_filling);
        // new_filling.splice(hoverIndex, 0, dragCard);
        // console.log(new_filling);

        dispatch({
            type: SWAP_CONSTRUCTOR_INGREDIENTS,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        });
    }, []);

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
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "sort",
        item: () => {
            return { index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    //-----------------------------------

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
                handleClose={(e) => {
                    dispatch({
                        type: DELETE_CONSTRUCTOR_INGREDIENT,
                        index: index,
                    });
                    dispatch({
                        type: DECREASE_INGREDIENT_COUNTER,
                        id: ingredient._id,
                    });
                }}
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
