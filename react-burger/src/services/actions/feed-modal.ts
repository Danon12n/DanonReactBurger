import { store } from "../store";
import { bindActionCreators } from "redux";
import {
    GET_FEED_FAILED,
    GET_FEED_REQUEST,
    GET_FEED_SUCCESS,
} from "../action-types/feed-modal";
import { getOrderByNumber } from "../../utils/user-api";
import { IFeedMessage, TFeedOrder } from "../../types/types";

export interface IGetFeedRequest {
    readonly type: typeof GET_FEED_REQUEST;
}
export interface IGetFeedSuccess {
    readonly type: typeof GET_FEED_SUCCESS;
    payload: IFeedMessage;
}
export interface IGetFeedFailed {
    readonly type: typeof GET_FEED_FAILED;
}

export type TFeedModalAction =
    | IGetFeedRequest
    | IGetFeedSuccess
    | IGetFeedFailed;

const doGetFeedRequest = () => ({
    type: GET_FEED_REQUEST,
});
const doGetFeedSuccess = (feed: TFeedOrder) => ({
    type: GET_FEED_SUCCESS,
    payload: feed,
});
const doGetFeedFailed = () => ({
    type: GET_FEED_FAILED,
});

export const boundFeedModal = bindActionCreators(
    {
        feedRequest: doGetFeedRequest,
        feedSuccess: doGetFeedSuccess,
        feedFailed: doGetFeedFailed,
    },
    store.dispatch
);

export function getFeedAction(orderNumber: number | string) {
    boundFeedModal.feedRequest();

    getOrderByNumber(orderNumber)
        .then((data) => {
            if (data && data.orders) boundFeedModal.feedSuccess(data.orders[0]);
        })
        .catch((err) => {
            boundFeedModal.feedFailed();
        });
}
