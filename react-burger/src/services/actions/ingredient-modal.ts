import { store } from "../store";
import { bindActionCreators } from "redux";
import {
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
} from "../action-types/ingredient-modal";
import { TIngredientWithCounter } from "../../types/types";

export interface ISetCurrentIngredient {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly payload: TIngredientWithCounter;
}

export interface IDeleteCurrentIngredient {
    readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export type TIngredientModalAction =
    | ISetCurrentIngredient
    | IDeleteCurrentIngredient;

const doSetCurrentIngredient = (
    ingredient: TIngredientWithCounter | undefined
) => ({
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
