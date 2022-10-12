import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useState, useMemo } from "react";

export default function BurgerConstructor({ ingredients }) {
    const [filling, bun] = useMemo(() => {
        const filling = ingredients
            .filter((ingredient) => ingredient.type !== "bun")
            .map((elem) => {
                return { [uuid()]: elem };
            });
        return [
            filling,
            ingredients.find((ingredient) => ingredient.type === "bun"),
        ];
    }, [ingredients]);

    const [isVisible, setIsVisible] = useState(false);

    const close = (e) => {
        setIsVisible(false);
    };

    const show = (e) => {
        setIsVisible(true);
    };

    return (
        <>
            <div className='mt-25 pl-4 pr-4'>
                <ConstructorElement
                    extraClass={"ml-8 mb-4"}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    type='top'
                    isLocked={true}
                />
                <div className={BurgerConstructorStyles.container}>
                    {filling.map((ingredient) => {
                        return (
                            <div
                                key={Object.keys(ingredient)[0]}
                                className={
                                    BurgerConstructorStyles.BurgerPartWrapper
                                }
                            >
                                <DragIcon />
                                <ConstructorElement
                                    extraClass='ml-2 mb-4'
                                    text={Object.values(ingredient)[0].name}
                                    price={Object.values(ingredient)[0].price}
                                    thumbnail={
                                        Object.values(ingredient)[0].image
                                    }
                                />
                            </div>
                        );
                    })}
                </div>

                <ConstructorElement
                    extraClass='ml-8 mt-4'
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    type='bottom'
                    isLocked={true}
                />
                <div
                    className={BurgerConstructorStyles.buttonWrapper + " mt-10"}
                >
                    <p className='text text_type_digits-medium  mr-3'>123</p>
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

BurgerConstructor.defaultProps = {
    ingredients: [],
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
};
