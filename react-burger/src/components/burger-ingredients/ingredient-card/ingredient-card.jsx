import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCardStyles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function IngredientCard({ name, price, image }) {
    /* eslint-disable */
    // блокирую тут линтер, потому что пока функцию
    // изменения стейта счетчика не использую
    const [Quantity, setQuantity] = useState(0);
    /* eslint-enable */

    return (
        <div className={IngredientCardStyles.card + " p-4"}>
            {Quantity > 0 && <Counter size='default' count={Quantity} />}
            <img src={image} alt='Ингредиент' />
            <div
                className={IngredientCardStyles.cardPriceWrapper + " mt-1 mb-1"}
            >
                <p className='text text_type_digits-default mr-3'>{price}</p>
                <CurrencyIcon />
            </div>
            <p className='text text_type_main-default'>{name}</p>
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
