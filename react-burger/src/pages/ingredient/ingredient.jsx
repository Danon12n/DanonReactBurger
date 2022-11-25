import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { boundIngredientModal } from "../../services/actions/ingredient-modal";
import { useEffect } from "react";

const IngredientPage = function () {
    const dispatch = useDispatch();
    const { currentIngredient } = useSelector((store) => store.ingredientModal);
    const { ingredients, ingredientsRequest } = useSelector(
        (store) => store.burgerIngredients
    );
    const { id } = useParams();

    useEffect(() => {
        if (ingredients.length === 0 || ingredients === null) {
            getIngredientsAction();
        }
    }, []);

    useEffect(() => {
        if (ingredientsRequest === false) {
            const ingredient = ingredients.find((el) => {
                if (el._id === id) return el;
            });
            dispatch(boundIngredientModal.setIngredient(ingredient));
        }
    }, [ingredientsRequest]);

    return currentIngredient ? (
        <div className={styles.wrapper}>
            <IngredientDetails />
        </div>
    ) : (
        <p>Loading...</p>
    );
};
export { IngredientPage };
