import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./burger-constructor.module.css";

import data from "../../utils/data";

const test_data = data.filter((ingredient) => ingredient.type !== "bun");
const bun = data.find((ingredient) => ingredient.type === "bun");

export default function BurgerConstructor() {
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
                {test_data.map((ingredient) => {
                    return (
                        <div
                            key={ingredient._id}
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
