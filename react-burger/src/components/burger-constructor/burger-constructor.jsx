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
import { getOrderNumberAction } from "../../services/actions";

//TODO: реадизовать условный рендеринг, когда в ingredientsInConstructor пустой или в нем
//      нет булок... если нет то <p>ДОБАВЬТЕ БУЛКУ!</p>, если есть то все как раньше...

export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const ingredientsInConstructor = useSelector(
        (store) => store.main.ingredients
    );

    const [filling, bun, finalPrice] = useMemo(() => {
        const filling = ingredientsInConstructor
            .filter((ingredient) => ingredient.type !== "bun")
            .map((elem) => {
                elem.key = uuid();
                return elem;
            });

        const bun = ingredientsInConstructor.find(
            (ingredient) => ingredient.type === "bun"
        );
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
    }, [ingredientsInConstructor]);

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
