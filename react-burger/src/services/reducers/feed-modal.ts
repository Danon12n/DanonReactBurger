import { TFeedOrder } from "../../types/types";
import { TFeedModalAction } from "../actions/feed-modal";

export type TFeedModalState = {
    feed: TFeedOrder | null;
    feedNumberRequest: boolean;
    feedNumberFailed: boolean;
};

const initialState: TFeedModalState = {
    feed: null,
    feedNumberRequest: false,
    feedNumberFailed: false,
};

export const feedModalReducer = (
    state = initialState,
    action: TFeedModalAction
) => {
    switch (action.type) {
        case "GET_FEED_REQUEST":
            return {
                ...state,
                feedNumberRequest: true,
                feedNumberFailed: false,
            };
        case "GET_FEED_SUCCESS":
            return {
                ...state,
                feedNumberRequest: false,
                feed: { ...action.payload },
            };
        case "GET_FEED_FAILED":
            return {
                ...state,
                feedNumberRequest: false,
                feedNumberFailed: true,
            };

        default:
            return state;
    }
};
