import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCardStyles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

import { Modal } from "../../modal/modal";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";

export default function IngredientCard({ ingredient }) {
    // eslint-disable-next-line
    const [quantity, setQuantity] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const { image, price, name } = ingredient;

    const close = (e) => {
        setIsVisible(false);
    };

    const show = (e) => {
        setIsVisible(true);
    };

    return (
        <>
            <div className={IngredientCardStyles.card + " p-4"} onClick={show}>
                {quantity > 0 && (
                    <Counter
                        extraClass={IngredientCardStyles.counter}
                        count={quantity}
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
        </>
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
