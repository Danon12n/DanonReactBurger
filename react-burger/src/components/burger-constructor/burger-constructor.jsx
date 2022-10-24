import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import uuid from "react-uuid";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomConstructorElement from "./custom-constructor-element/custom-constructor-element";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    DECREASE_INGREDIENT_COUNTER,
    getOrderNumberAction,
    INCREASE_INGREDIENT_COUNTER,
    UPDATE_CONSTRUCTOR_BUN,
} from "../../services/actions";
import { useDrop } from "react-dnd/dist/hooks/useDrop";

export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const ingredients = useSelector((store) => store.main.ingredients);
    const currentBun = useSelector(
        (store) => store.main.ingredientsInConstructor.bun
    );

    const onDropHandler = (itemId) => {
        const ingredient = ingredients.find((elem) => elem._id === itemId._id);
        if (ingredient.type === "bun") {
            dispatch({
                type: UPDATE_CONSTRUCTOR_BUN,
                bun: ingredient,
            });
            dispatch({
                type: INCREASE_INGREDIENT_COUNTER,
                id: itemId._id,
            });
            dispatch({ type: DECREASE_INGREDIENT_COUNTER, id: currentBun._id });
        } else {
            dispatch({
                type: ADD_CONSTRUCTOR_INGREDIENT,
                ingredient: ingredient,
            });
            dispatch({
                type: INCREASE_INGREDIENT_COUNTER,
                id: itemId._id,
            });
        }
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    const { filling, bun } = useSelector(
        (store) => store.main.ingredientsInConstructor
    );

    const finalPrice = useMemo(() => {
        if (bun.price) {
            return (
                bun.price * 2 +
                filling.reduce((sum, elem) => {
                    return sum + elem.price;
                }, 0)
            );
        } else return 0;
    }, [filling, bun]);

    const [isVisible, setIsVisible] = useState(false);

    const close = (e) => {
        setIsVisible(false);
    };

    const onCreateOrderClick = (e) => {
        const orderBody = [
            bun._id,
            ...filling.map((elem) => {
                return elem._id;
            }),
            bun._id,
        ];

        dispatch(getOrderNumberAction(orderBody));
        setIsVisible(true);
    };

    const isActiveCont = isHover ? BurgerConstructorStyles.active : "";

    return (
        <>
            <div className='mt-25 pl-4 pr-4'>
                <CustomConstructorElement isBun={true} ingredient={bun} />
                <div
                    ref={dropTarget}
                    className={`${BurgerConstructorStyles.container} ${isActiveCont}`}
                >
                    {filling.map((ingredient, i) => {
                        return (
                            <CustomConstructorElement
                                //key={ingredient.key}
                                isBun={false}
                                index={i}
                                ingredient={ingredient}
                            />
                        );
                    })}
                </div>
                <CustomConstructorElement
                    isBun={true}
                    position='bottom'
                    ingredient={bun}
                />
                <div
                    className={BurgerConstructorStyles.buttonWrapper + " mt-10"}
                >
                    <p className='text text_type_digits-medium  mr-3'>
                        {finalPrice}
                    </p>
                    <CurrencyIcon />
                    <Button
                        onClick={onCreateOrderClick}
                        htmlType='submit'
                        extraClass='ml-10'
                        size='large'
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {isVisible && (
                <Modal title={""} onClose={close}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}
