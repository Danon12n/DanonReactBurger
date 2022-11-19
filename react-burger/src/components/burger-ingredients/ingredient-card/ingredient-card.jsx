import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCardStyles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Modal } from "../../modal/modal";
import { IngredientDetails } from "../../ingredient-details/ingredient-details";
import { useDrag } from "react-dnd/dist/hooks";
import { boundIngredientModal } from "../../../services/actions/ingredient-modal";

export default function IngredientCard({ ingredient }) {
    const { currentIngredient } = useSelector((store) => store.ingredientModal);

    const { _id, image, price, name, counter } = ingredient;

    const [{}, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
    });

    const close = (e) => {
        window.history.pushState(null, "", "/");
        boundIngredientModal.deleteIngredient();
    };

    const show = (e) => {
        window.history.pushState(null, "", `/ingredients/${_id}`);
        boundIngredientModal.setIngredient(ingredient);
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
            {currentIngredient !== null && (
                <Modal title={"Детали ингредиента"} onClose={close}>
                    <IngredientDetails />
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
