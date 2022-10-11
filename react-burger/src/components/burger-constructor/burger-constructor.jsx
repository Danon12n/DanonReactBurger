import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import uuid from "react-uuid";

export default function BurgerConstructor({ ingredients }) {
    const filling = ingredients.filter(
        (ingredient) => ingredient.type !== "bun"
    );
    const bun = ingredients.find((ingredient) => ingredient.type === "bun");

    return (
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
                            key={uuid()}
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
            <div className={BurgerConstructorStyles.buttonWrapper + " mt-10"}>
                <p className='text text_type_digits-medium  mr-3'>123</p>
                <CurrencyIcon />
                <Button htmlType='submit' extraClass='ml-10' size='large'>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.defaultProps = {
    ingredients: [],
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
};