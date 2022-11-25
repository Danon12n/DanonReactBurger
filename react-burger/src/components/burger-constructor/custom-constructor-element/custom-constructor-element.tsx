import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./custom-constructor-element.module.css";
import { useRef, FC } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { boundBurgerConstructorActions } from "../../../services/actions/burger-constructor";
import { boundBurgerIngredientsActions } from "../../../services/actions/burger-ingredients";
import { TIngredientWithCounter } from "../../../types/types";

interface ICustomConstructorElementProps {
    isBun: boolean;
    position?: "top" | "bottom" | undefined;
    index?: number;
    ingredient: TIngredientWithCounter;
}

type TDropItem = {
    index: number;
};

const CustomConstructorElement: FC<ICustomConstructorElementProps> = ({
    isBun,
    position,
    index,
    ingredient,
}) => {
    const deleteIngredient = () => {
        boundBurgerConstructorActions.deleteIngredient(index);
        boundBurgerIngredientsActions.decreaseCounter(ingredient._id);
    };
    const ref = useRef<null | HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<TDropItem, void, any>({
        accept: "sort",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: TDropItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            if (index === undefined) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            if (clientOffset === null) return;

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
    const [, drag] = useDrag({
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
            <DragIcon type='primary' />
            <ConstructorElement
                extraClass='ml-2'
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={deleteIngredient}
            />
        </div>
    );
};

export default CustomConstructorElement;
