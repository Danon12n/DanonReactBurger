import { combineReducers } from "redux";

import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS,
    SET_CONSTRUCTOR_INGREDIENTS,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS,
} from "../actions/index";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientsInConstructor: [],

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
            return {
                ...state,
                ingredientsRequest: false,
                ingredients: [...action.ingredients],
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
        case SET_CONSTRUCTOR_INGREDIENTS:
            return {
                ...state,
                ingredientsInConstructor: action.ingredients,
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
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    main: mainReducer,
});
