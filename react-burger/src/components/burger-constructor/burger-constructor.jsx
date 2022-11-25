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
import { Redirect } from "react-router-dom";

export default function BurgerConstructor() {
    const dispatch = useDispatch();
    const { isAuthed } = useSelector((store) => store.users);

    const ingredients = useSelector(
        (store) => store.burgerIngredients.ingredients
    );
    const { fillings, bun } = useSelector((store) => store.burgerConstructor);

    const onDropHandler = (itemId) => {
        const ingredient = ingredients.find((elem) => elem._id === itemId._id);
        if (ingredient.type === "bun") {
            boundBurgerConstructorActions.updateBun(ingredient);
            boundBurgerIngredientsActions.increaseCounter(itemId._id);
            if (bun !== null)
                boundBurgerIngredientsActions.decreaseCounter(bun._id);
        } else {
            const newIngredient = { ...ingredient };
            newIngredient.ingredientKey = uuid();
            boundBurgerConstructorActions.addIngredient(newIngredient);
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
        } else if (fillings.length !== 0) {
            return fillings.reduce((sum, elem) => {
                return sum + elem.price;
            }, 0);
        }
        return 0;
    }, [fillings, bun]);

    const [isVisible, setIsVisible] = useState(false);
    const [toggleRedirect, setToggleRedirect] = useState(false);

    const close = (e) => {
        setIsVisible(false);
    };
    const redirectOnClick = () => {
        setToggleRedirect(true);
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

    return !toggleRedirect ? (
        <>
            {bun !== null || fillings.length !== 0 ? (
                <div className='mt-25 pl-4 pr-4'>
                    {bun !== null && (
                        <CustomConstructorElement
                            isBun={true}
                            ingredient={bun}
                        />
                    )}
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
                    {bun !== null && (
                        <CustomConstructorElement
                            isBun={true}
                            position='bottom'
                            ingredient={bun}
                        />
                    )}
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
                            onClick={
                                isAuthed ? onCreateOrderClick : redirectOnClick
                            }
                            htmlType='submit'
                            extraClass='ml-10'
                            size='large'
                            disabled={bun === null}
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
    ) : (
        <Redirect to='/login' />
    );
}
