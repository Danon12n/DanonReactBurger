import { store } from "../store";
import { bindActionCreators } from "redux";
import { getIngredients } from "../../utils/burger-api";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
} from "../action-types/burger-ingredients";
import { TIngredientWithCounter } from "../../types/types";

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Array<TIngredientWithCounter>;
}
export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IIncreaseIngredientCounter {
    readonly type: typeof INCREASE_INGREDIENT_COUNTER;
    readonly payload: string;
}
export interface IDecreaseIngredientCounter {
    readonly type: typeof DECREASE_INGREDIENT_COUNTER;
    readonly payload: string;
}

export type TBurgeIngredientsAction =
    | IGetIngredientsFailed
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IIncreaseIngredientCounter
    | IDecreaseIngredientCounter;

const doGetIngredientsRequest = () => ({ type: GET_INGREDIENTS_REQUEST });
const doGetIngredientsSuccess = (
    ingredients: Array<TIngredientWithCounter> | undefined
) => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredients,
});
const doGetIngredientsFailed = () => ({ type: GET_INGREDIENTS_FAILED });
const doIncreaseIngredientCounter = (id: string) => ({
    type: INCREASE_INGREDIENT_COUNTER,
    payload: id,
});
const doDecreaseIngredientCounter = (id: string) => ({
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
            boundBurgerIngredientsActions.success(data?.data);
        })
        .catch(() => {
            alert("Возникла ошибка при загрузке ингедиентов");
            boundBurgerIngredientsActions.failed();
        });
}
