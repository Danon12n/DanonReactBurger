import { store } from "../store";
import { bindActionCreators } from "redux";
import {
    UPDATE_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    SWAP_CONSTRUCTOR_INGREDIENTS,
    DELETE_CONSTRUCTOR_INGREDIENT,
} from "../action-types/burger-constructor";
import { TIngredientWithCounter } from "../../types/types";

export interface IUpdateConstructorBun {
    readonly type: typeof UPDATE_CONSTRUCTOR_BUN;
    readonly payload: TIngredientWithCounter;
}

export interface IAddConstructorIngredient {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    readonly payload: TIngredientWithCounter;
}

export interface ISwapConstructorIngredients {
    readonly type: typeof SWAP_CONSTRUCTOR_INGREDIENTS;
    readonly payload: { dragIndex: number; hoverIndex: number };
}

export interface IDeleteConstructorIngredient {
    readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
    readonly payload: number;
}

export type TBurgerConstructorAction =
    | IUpdateConstructorBun
    | IAddConstructorIngredient
    | ISwapConstructorIngredients
    | IDeleteConstructorIngredient;

const doUpdateConstructorBun = (bun: TIngredientWithCounter) => ({
    type: UPDATE_CONSTRUCTOR_BUN,
    payload: bun,
});
const doAddConstructorIngredient = (ingredient: TIngredientWithCounter) => ({
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload: ingredient,
});
const doSwapConstructorIngredients = (
    dragIndex: number,
    hoverIndex: number
) => ({
    type: SWAP_CONSTRUCTOR_INGREDIENTS,
    payload: { dragIndex, hoverIndex },
});
const doDeleteConstructorIngredient = (index: number | undefined) => ({
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
