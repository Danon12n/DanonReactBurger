import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCardStyles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd/dist/hooks";
import { boundIngredientModal } from "../../../services/actions/ingredient-modal";
import { FC} from "react";
import {
    TIngredientWithCounter,
} from "../../../types/types";

interface IIngredientCardProps {
    ingredient: TIngredientWithCounter;
}

const IngredientCard: FC<IIngredientCardProps> = ({ ingredient }) => {

    const { _id, image, price, name, counter } = ingredient;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
    });


    const setIngredient = () => {
        boundIngredientModal.setIngredient(ingredient);
    };

    return (
        <div ref={dragRef}>
            <div className={IngredientCardStyles.card + " p-4"} onClick={setIngredient} >
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
            
        </div>
    );
};

export default IngredientCard;
