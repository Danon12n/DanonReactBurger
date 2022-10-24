import { combineReducers } from "redux";

import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS,
    UPDATE_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    DELETE_CONSTRUCTOR_INGREDIENT,
    SET_CONSTRUCTOR_INGREDIENTS,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
    SWAP_CONSTRUCTOR_INGREDIENTS,
} from "../actions/index";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientsInConstructor: {
        filling: [],
        bun: {
            name: "Булка",
            price: "0",
        },
    },

    currentIngredient: {},

    orderNumber: -1,
    orderNumberRequest: false,
    orderNumberFailed: false,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        case GET_INGREDIENTS_SUCCESS:
            const res = action.ingredients.map((elem) => {
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
        case GET_ORDER_NUMBER:
            return {
                ...state,
                orderNumberRequest: true,
                orderNumberFailed: false,
            };
        case GET_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderNumberRequest: false,
                orderNumber: action.orderNumber,
            };
        case GET_ORDER_NUMBER_FAILED:
            return {
                ...state,
                orderNumberRequest: false,
                orderNumberFailed: true,
            };
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.ingredient,
            };
        case DELETE_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: {},
            };
        case UPDATE_CONSTRUCTOR_BUN:
            return {
                ...state,
                ingredientsInConstructor: {
                    ...state.ingredientsInConstructor,
                    bun: action.bun,
                },
            };
        case ADD_CONSTRUCTOR_INGREDIENT:
            return {
                ...state,
                ingredientsInConstructor: {
                    ...state.ingredientsInConstructor,
                    filling: [
                        ...state.ingredientsInConstructor.filling,
                        action.ingredient,
                    ],
                },
            };
        case DELETE_CONSTRUCTOR_INGREDIENT:
            return {
                ...state,
                ingredientsInConstructor: {
                    ...state.ingredientsInConstructor,
                    filling: [
                        ...state.ingredientsInConstructor.filling.filter(
                            (elem, i) => {
                                if (action.index !== i) return elem;
                            }
                        ),
                    ],
                },
            };
        case SET_CONSTRUCTOR_INGREDIENTS:
            return {
                ...state,
                ingredientsInConstructor: {
                    ...state.ingredientsInConstructor,
                    filling: [...action.ingredients],
                },
            };
        case SWAP_CONSTRUCTOR_INGREDIENTS:
            const new_filling = state.ingredientsInConstructor.filling.map(
                (el) => {
                    return el;
                }
            );
            const dragCard = new_filling[action.dragIndex];
            new_filling.splice(action.dragIndex, 1);
            new_filling.splice(action.hoverIndex, 0, dragCard);
            return {
                ...state,
                ingredientsInConstructor: {
                    ...state.ingredientsInConstructor,
                    filling: [...new_filling],
                },
            };
        case INCREASE_INGREDIENT_COUNTER:
            const res1 = state.ingredients.map((elem) => {
                if (elem._id === action.id) elem.counter++;

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
                        if (elem._id === action.id) elem.counter--;
                        return elem;
                    }),
                ],
            };
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    main: mainReducer,
});
