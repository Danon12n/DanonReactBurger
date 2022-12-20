import { bindActionCreators } from "redux";
import { IFeedMessage } from "../../types/types";
import {
    FEED_WS_CONNECTION_CLOSED,
    FEED_WS_CONNECTION_ERROR,
    FEED_WS_CONNECTION_START,
    FEED_WS_CONNECTION_SUCCESS,
    FEED_WS_GET_MESSAGE,
    FEED_WS_SEND_MESSAGE,
} from "../action-types/feedWS";
import { store } from "../store";

export interface IFeedWSConnectionStart {
    readonly type: typeof FEED_WS_CONNECTION_START;
    readonly payload: { wsUrl: string };
}
export interface IFeedWSConnectionClosed {
    readonly type: typeof FEED_WS_CONNECTION_CLOSED;
}
export interface IFeedWSConnectionError {
    readonly type: typeof FEED_WS_CONNECTION_ERROR;
}
export interface IFeedWSConnectionSuccess {
    readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
}
export interface IFeedWSGetMessage {
    readonly type: typeof FEED_WS_GET_MESSAGE;
    readonly payload: IFeedMessage;
}
export interface IFeedWSSendMessage {
    readonly type: typeof FEED_WS_SEND_MESSAGE;
}

export type TFeedWSAction =
    | IFeedWSConnectionClosed
    | IFeedWSConnectionError
    | IFeedWSConnectionStart
    | IFeedWSConnectionSuccess
    | IFeedWSGetMessage
    | IFeedWSSendMessage;

const doFeedWSConnectionStart = (wsUrl: string): IFeedWSConnectionStart => ({
    type: "FEED_WS_CONNECTION_START",
    payload: { wsUrl: wsUrl },
});
const doFeedWSConnectionClosed = (): IFeedWSConnectionClosed => ({
    type: "FEED_WS_CONNECTION_CLOSED",
});
const doFeedWSConnectionError = (): IFeedWSConnectionError => ({
    type: "FEED_WS_CONNECTION_ERROR",
});
const doFeedWSConnectionSuccess = (): IFeedWSConnectionSuccess => ({
    type: "FEED_WS_CONNECTION_SUCCESS",
});
const doFeedWSGetMessage = (message: IFeedMessage): IFeedWSGetMessage => ({
    type: "FEED_WS_GET_MESSAGE",
    payload: message,
});
const doFeedWSSendMessage = (): IFeedWSSendMessage => ({
    type: "FEED_WS_SEND_MESSAGE",
});

export const boundFeedWS = bindActionCreators(
    {
        wsStart: doFeedWSConnectionStart,
        wsClosed: doFeedWSConnectionClosed,
        wsError: doFeedWSConnectionError,
        wsSuccess: doFeedWSConnectionSuccess,
        wsGetMessage: doFeedWSGetMessage,
        wsSendMessage: doFeedWSSendMessage,
    },
    store.dispatch
);
