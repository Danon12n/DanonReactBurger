import {
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
} from "../constant";

const initialState = {
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,
};

export const orderModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST:
            return {
                ...state,
                orderNumberRequest: true,
                orderNumberFailed: false,
            };
        case GET_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderNumberRequest: false,
                orderNumber: action.payload,
            };
        case GET_ORDER_NUMBER_FAILED:
            return {
                ...state,
                orderNumberRequest: false,
                orderNumberFailed: true,
            };

        default:
            return state;
    }
};
