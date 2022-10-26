import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from "../constant";

const initialState = {
    currentIngredient: null,
};

export const ingredientModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload,
            };
        case DELETE_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null,
            };

        default:
            return state;
    }
};
