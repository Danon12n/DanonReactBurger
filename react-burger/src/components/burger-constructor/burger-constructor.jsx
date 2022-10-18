import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import uuid from "react-uuid";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useState, useMemo, useContext } from "react";
import CustomConstructorElement from "./custom-constructor-element/custom-constructor-element";
import { BurgerConstructorContext } from "../../utils/burger-constructor-context";
import { createOrder } from "../../utils/burger-api";

export default function BurgerConstructor() {
    const { state, dispatch } = useContext(BurgerConstructorContext);
    const ingredients = state.ingredients;

    const [filling, bun, finalPrice] = useMemo(() => {
        const filling = ingredients
            .filter((ingredient) => ingredient.type !== "bun")
            .map((elem) => {
                elem.key = uuid();
                return elem;
            });

        const bun = ingredients.find((ingredient) => ingredient.type === "bun");
        if (bun && filling) {
            return [
                filling,
                bun,
                bun.price * 2 +
                    filling.reduce((sum, elem) => {
                        return sum + elem.price;
                    }, 0),
            ];
        }
        return [filling, bun];
    }, [ingredients]);

    const [isVisible, setIsVisible] = useState(false);

    const close = (e) => {
        setIsVisible(false);
    };

    const show = (e) => {
        const orderBody = filling.map((elem) => {
            return elem._id;
        });
        orderBody.push(bun._id);

        createOrder(orderBody)
            .then((data) => {
                dispatch({
                    type: "setOrderNumber",
                    payload: data.order.number,
                });
            })
            .catch(() => alert("Возникла ошибка при создании заказа"))
            .finally(() => {
                setIsVisible(true);
                console.log(state.orderNumber);
            });
    };

    return (
        <>
            <div className='mt-25 pl-4 pr-4'>
                <CustomConstructorElement isBun={true} ingredient={bun} />
                <div className={BurgerConstructorStyles.container}>
                    {filling.map((ingredient) => {
                        return (
                            <CustomConstructorElement
                                key={ingredient.key}
                                isBun={false}
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
                        onClick={show}
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
