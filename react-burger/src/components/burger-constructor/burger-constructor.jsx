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
                elem.key = uuid();
                return elem;
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
                                key={ingredient.key}
                                className={
                                    BurgerConstructorStyles.BurgerPartWrapper
                                }
                            >
                                <DragIcon />
                                <ConstructorElement
                                    extraClass='ml-2 mb-4'
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
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
