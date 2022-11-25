import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCardStyles from "./ingredient-card.module.css";
import { useSelector } from "react-redux";
import { Modal } from "../../modal/modal";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import { useDrag } from "react-dnd/dist/hooks";
import { boundIngredientModal } from "../../../services/actions/ingredient-modal";
import { FC, useState } from "react";
import {
    TIngredientWithCounter,
    TStore,
    TStoreIngredientModal,
} from "../../../types/types";

interface IIngredientCardProps {
    ingredient: TIngredientWithCounter;
}

const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {
    const [isVisible, setisVisible] = useState(false);
    const { currentIngredient } = useSelector<TStore, TStoreIngredientModal>(
        (store) => store.ingredientModal
    );

    const { _id, image, price, name, counter } = ingredient;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
    });

    const close = () => {
        window.history.pushState(null, "", "/");
        boundIngredientModal.deleteIngredient();
        setisVisible(false);
    };

    const show = () => {
        window.history.pushState(null, "", `/ingredients/${_id}`);
        boundIngredientModal.setIngredient(ingredient);
        setisVisible(true);
    };

    return (
        <div ref={dragRef}>
            <div className={IngredientCardStyles.card + " p-4"} onClick={show}>
                {counter > 0 && (
                    <Counter
                        extraClass={IngredientCardStyles.counter}
                        count={counter}
                    />
                )}
                <img src={image} alt='Ингредиент' />
                <div
                    className={
                        IngredientCardStyles.cardPriceWrapper + " mt-1 mb-1"
                    }
                >
                    <p className='text text_type_digits-default mr-3'>
                        {price}
                    </p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className='text text_type_main-default'>{name}</p>
            </div>
            {currentIngredient !== null && isVisible && (
                <Modal title={"Детали ингредиента"} onClose={close}>
                    <IngredientDetails />
                </Modal>
            )}
        </div>
    );
};

export default IngredientCard;
