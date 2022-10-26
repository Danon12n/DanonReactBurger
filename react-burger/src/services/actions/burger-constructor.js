import { store } from "../store";
import { bindActionCreators } from "redux";
import {
    UPDATE_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    SWAP_CONSTRUCTOR_INGREDIENTS,
    DELETE_CONSTRUCTOR_INGREDIENT,
} from "../constant";

const doUpdateConstructorBun = (bun) => ({
    type: UPDATE_CONSTRUCTOR_BUN,
    payload: bun,
});
const doAddConstructorIngredient = (payload) => ({
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload,
});
const doSwapConstructorIngredients = (payload) => ({
    type: SWAP_CONSTRUCTOR_INGREDIENTS,
    payload,
});
const doDeleteConstructorIngredient = (index) => ({
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    payload: index,
});

export const boundBurgerConstructorActions = bindActionCreators(
    {
        updateBun: doUpdateConstructorBun,
        addIngredient: doAddConstructorIngredient,
        swapIngredients: doSwapConstructorIngredients,
        deleteIngredient: doDeleteConstructorIngredient,
    },
    store.dispatch
);
