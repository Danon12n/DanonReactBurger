import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCardStyles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../modal/modal";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import {
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
} from "../../../services/actions";
import { useDrag } from "react-dnd/dist/hooks";

export default function IngredientCard({ ingredient }) {
    // eslint-disable-next-line
    const [isVisible, setIsVisible] = useState(false);

    const dispatch = useDispatch();

    const { _id, image, price, name, counter } = ingredient;

    const [{}, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
    });

    const close = (e) => {
        dispatch({
            type: DELETE_CURRENT_INGREDIENT,
        });
        setIsVisible(false);
    };

    const show = (e) => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            ingredient: ingredient,
        });
        setIsVisible(true);
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
                    <CurrencyIcon />
                </div>
                <p className='text text_type_main-default'>{name}</p>
            </div>
            {isVisible && (
                <Modal title={"Детали ингредиента"} onClose={close}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
        </div>
    );
}

IngredientCard.defaultProps = {
    name: "Ингредиент",
    price: 0,
    image: "",
};

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};
