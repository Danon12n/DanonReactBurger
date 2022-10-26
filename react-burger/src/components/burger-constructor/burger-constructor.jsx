import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import uuid from "react-uuid";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomConstructorElement from "./custom-constructor-element/custom-constructor-element";
import { boundBurgerConstructorActions } from "../../services/actions/burger-constructor";
import { boundBurgerIngredientsActions } from "../../services/actions/burger-ingredients";
import { getOrderNumberAction } from "../../services/actions/order-modal";
import { useDrop } from "react-dnd/dist/hooks/useDrop";

export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const ingredients = useSelector(
        (store) => store.burgerIngredients.ingredients
    );
    const { fillings, bun } = useSelector((store) => store.burgerConstructor);

    const onDropHandler = (itemId) => {
        const ingredient = ingredients.find((elem) => elem._id === itemId._id);
        if (ingredient.type === "bun") {
            boundBurgerConstructorActions.updateBun(ingredient);
            boundBurgerIngredientsActions.increaseCounter(itemId._id);
            boundBurgerIngredientsActions.decreaseCounter(bun._id);
        } else {
            const ingredientKey = uuid();
            boundBurgerConstructorActions.addIngredient({
                ingredient,
                ingredientKey,
            });
            boundBurgerIngredientsActions.increaseCounter(itemId._id);
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

    const finalPrice = useMemo(() => {
        if (bun !== null) {
            return (
                bun.price * 2 +
                fillings.reduce((sum, elem) => {
                    return sum + elem.price;
                }, 0)
            );
        } else return 0;
    }, [fillings, bun]);

    const [isVisible, setIsVisible] = useState(false);

    const close = (e) => {
        setIsVisible(false);
    };

    const onCreateOrderClick = (e) => {
        const orderBody = [
            bun._id,
            ...fillings.map((elem) => {
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
            {bun !== null ? (
                <div className='mt-25 pl-4 pr-4'>
                    <CustomConstructorElement isBun={true} ingredient={bun} />
                    <div
                        ref={dropTarget}
                        className={`${BurgerConstructorStyles.container} ${isActiveCont}`}
                    >
                        {fillings.map((ingredient, i) => {
                            return (
                                <CustomConstructorElement
                                    key={ingredient.ingredientKey}
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
                        className={
                            BurgerConstructorStyles.buttonWrapper + " mt-10"
                        }
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
            ) : (
                <div
                    ref={dropTarget}
                    className={BurgerConstructorStyles.infoWrapper}
                >
                    <p className='text text_type_main-medium'>
                        Перенеси булочку сюда
                    </p>
                </div>
            )}
            {isVisible && (
                <Modal title={""} onClose={close}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}
