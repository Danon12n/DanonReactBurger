import { store } from "../store";
import { bindActionCreators } from "redux";
import { getIngredients } from "../../utils/burger-api";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
} from "../constant";

const doGetIngredientsRequest = () => ({ type: GET_INGREDIENTS_REQUEST });
const doGetIngredientsSuccess = (ingredients) => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredients,
});
const doGetIngredientsFailed = () => ({ type: GET_INGREDIENTS_FAILED });
const doIncreaseIngredientCounter = (id) => ({
    type: INCREASE_INGREDIENT_COUNTER,
    payload: id,
});
const doDecreaseIngredientCounter = (id) => ({
    type: DECREASE_INGREDIENT_COUNTER,
    payload: id, 
});

export const boundBurgerIngredientsActions = bindActionCreators(
    {
        request: doGetIngredientsRequest,
        success: doGetIngredientsSuccess,
        failed: doGetIngredientsFailed,
        increaseCounter: doIncreaseIngredientCounter,
        decreaseCounter: doDecreaseIngredientCounter,
    },
    store.dispatch
);

export function getIngredientsAction() {
    boundBurgerIngredientsActions.request();

    getIngredients()
        .then((data) => {
            boundBurgerIngredientsActions.success(data);
        })
        .catch(() => {
            alert("Возникла ошибка при загрузке ингедиентов");
            boundBurgerIngredientsActions.failed();
        });
}
