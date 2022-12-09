import type { TWSAction } from "../actions/web-socket";
import type { IFeedMessage } from "../../types/types";

type TWSState = {
    wsConnected: boolean;
    messages: Array<IFeedMessage>;
    error?: undefined | Error;
};

const initialState: TWSState = {
    wsConnected: false,
    messages: [],
};

export const wsReducer = (state = initialState, action: TWSAction) => {
    switch (action.type) {
        case "WS_CONNECTION_SUCCESS":
            return {
                ...state,
                error: undefined,
                wsConnected: true,
            };
        case "WS_CONNECTION_ERROR":
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };
        case "WS_CONNECTION_CLOSED":
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };
        case "WS_CONNECTION_START":
            return { ...state };
        case "WS_GET_MESSAGE":
            return {
                ...state,
                error: undefined,
                messages: [...state.messages, action.payload],
            };
        case "WS_SEND_MESSAGE":
            return { ...state };
        default:
            return state;
    }
};
