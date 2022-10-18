import React from "react";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";

export const BurgerConstructorInitialState = {
    ingredients: [],
    orderNumber: -1,
};

export function reducer(state, action) {
    switch (action.type) {
        case SET_INGREDIENTS:
            return { ...state, ingredients: action.payload };
        case SET_ORDER_NUMBER:
            return { ...state, orderNumber: action.payload };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

export const BurgerConstructorContext = React.createContext();
