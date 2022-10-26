import { store } from "../store";
import { bindActionCreators } from "redux";
import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from "../constant";

const doSetCurrentIngredient = (ingredient) => ({
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient,
});
const doDeleteCurrentIngredient = () => ({
    type: DELETE_CURRENT_INGREDIENT,
});

export const boundIngredientModal = bindActionCreators(
    {
        setIngredient: doSetCurrentIngredient,
        deleteIngredient: doDeleteCurrentIngredient,
    },
    store.dispatch
);
