import { TIngredientWithCounter } from "../../../types/types";
import { TIngredientModalAction } from "../../actions/ingredient-modal";

export type TIngredientModalState = {
    currentIngredient: TIngredientWithCounter | null;
};

const initialState: TIngredientModalState = {
    currentIngredient: null,
};

export const ingredientModalReducer = (
    state = initialState,
    action: TIngredientModalAction
) => {
    switch (action.type) {
        case "SET_CURRENT_INGREDIENT":
            return {
                ...state,
                currentIngredient: { ...action.payload },
            };
        case "DELETE_CURRENT_INGREDIENT":
            return {
                ...state,
                currentIngredient: null,
            };

        default:
            return state;
    }
};
