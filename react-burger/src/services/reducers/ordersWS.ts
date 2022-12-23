import type { IFeedMessage } from "../../types/types";
import { TOrdersWSAction } from "../actions/ordersWS";

export type TOrdersWSState = {
    wsConnected: boolean;
    error: boolean;
    feed: IFeedMessage | null;
};

const initialState: TOrdersWSState = {
    wsConnected: false,
    error: false,
    feed: null,
};

export const ordersWSReducer = (
    state = initialState,
    action: TOrdersWSAction
) => {
    switch (action.type) {
        case "ORDERS_WS_CONNECTION_SUCCESS":
            return {
                ...state,
                error: false,
                wsConnected: true,
            };
        case "ORDERS_WS_CONNECTION_ERROR":
            return {
                ...state,
                error: true,
                wsConnected: false,
            };
        case "ORDERS_WS_CONNECTION_CLOSED":
            return {
                ...state,
                error: false,
                wsConnected: false,
            };
        case "ORDERS_WS_CONNECTION_START":
            return { ...state };
        case "ORDERS_WS_GET_MESSAGE":
            return {
                ...state,
                error: false,
                feed: { ...action.payload },
            };
        case "ORDERS_WS_SEND_MESSAGE":
            return { ...state };
        default:
            return state;
    }
};
