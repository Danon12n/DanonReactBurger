import type { IFeedMessage } from "../../types/types";
import { TFeedWSAction } from "../actions/feedWS";

export type TFeedWSState = {
    wsConnected: boolean;
    error: boolean;
    feed: IFeedMessage | null;
};

const initialState: TFeedWSState = {
    wsConnected: false,
    error: false,
    feed: null,
};

export const feedWSReducer = (state = initialState, action: TFeedWSAction) => {
    switch (action.type) {
        case "FEED_WS_CONNECTION_SUCCESS":
            return {
                ...state,
                error: false,
                wsConnected: true,
            };
        case "FEED_WS_CONNECTION_ERROR":
            return {
                ...state,
                error: true,
                wsConnected: false,
            };
        case "FEED_WS_CONNECTION_CLOSED":
            return {
                ...state,
                error: false,
                wsConnected: false,
            };
        case "FEED_WS_CONNECTION_START":
            return { ...state };
        case "FEED_WS_GET_MESSAGE":
            return {
                ...state,
                error: false,
                feed: { ...action.payload },
            };
        case "FEED_WS_SEND_MESSAGE":
            return { ...state };
        default:
            return state;
    }
};
