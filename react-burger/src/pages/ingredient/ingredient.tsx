import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { useSelector } from "react-redux";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { boundIngredientModal } from "../../services/actions/ingredient-modal";
import { FC, useEffect } from "react";
import { TStore, TStoreBurgerIngredients } from "../../types/types";

const IngredientPage: FC = () => {
    const { ingredients, ingredientsRequest } = useSelector<
        TStore,
        TStoreBurgerIngredients
    >((store) => store.burgerIngredients);
    const { id } = useParams<{ id?: string }>();

    useEffect(() => {
        if (ingredients.length === 0 || ingredients === null) {
            getIngredientsAction();
        }
    }, []);

    useEffect(() => {
        if (ingredientsRequest === false) {
            const ingredient = ingredients.find((el) => {
                if (el._id === id) return el;
                return false;
            });
            boundIngredientModal.setIngredient(ingredient);
        }
    }, [ingredientsRequest]);

    return (
        <div className={styles.wrapper}>
            <IngredientDetails />
        </div>
    );
};
export { IngredientPage };
