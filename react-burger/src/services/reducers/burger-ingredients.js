import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
} from "../constant";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        case GET_INGREDIENTS_SUCCESS:
            const res = action.payload.map((elem) => {
                elem.counter = 0;
                return elem;
            });
            return {
                ...state,
                ingredientsRequest: false,
                ingredients: [...res],
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            };
        case INCREASE_INGREDIENT_COUNTER:
            const res1 = state.ingredients.map((elem) => {
                if (elem._id === action.payload) {
                    elem.counter++;
                    if (elem.type === "bun") elem.counter++;
                }

                return elem;
            });
            return {
                ...state,
                ingredients: [...res1],
            };
        case DECREASE_INGREDIENT_COUNTER:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map((elem) => {
                        if (elem._id === action.payload) {
                            elem.counter--;
                            if (elem.type === "bun") elem.counter--;
                        }
                        return elem;
                    }),
                ],
            };
        default:
            return state;
    }
};
