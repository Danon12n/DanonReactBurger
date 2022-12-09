import { bindActionCreators } from "redux";
import { IFeedMessage } from "../../types/types";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from "../action-types/web-socket";
import { store } from "../store";

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Error;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IFeedMessage;
}
export interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
}

export type TWSAction =
    | IWSConnectionClosed
    | IWSConnectionError
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSGetMessage
    | IWSSendMessage;

const doWSConnectionStart = (): IWSConnectionStart => ({
    type: WS_CONNECTION_START,
});
const doWSConnectionClosed = (): IWSConnectionClosed => ({
    type: WS_CONNECTION_CLOSED,
});
const doWSConnectionError = (error: Error): IWSConnectionError => ({
    type: WS_CONNECTION_ERROR,
    payload: error,
});
const doWSConnectionSuccess = (): IWSConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS,
});
const doWSGetMessage = (message: IFeedMessage): IWSGetMessage => ({
    type: WS_GET_MESSAGE,
    payload: message,
});
const doWSSendMessage = (): IWSSendMessage => ({
    type: WS_SEND_MESSAGE,
});

export const boundWS = bindActionCreators(
    {
        wsStart: doWSConnectionStart,
        wsClosed: doWSConnectionClosed,
        wsError: doWSConnectionError,
        wsSuccess: doWSConnectionSuccess,
        wsGetMessage: doWSGetMessage,
        wsSendMessage: doWSSendMessage,
    },
    store.dispatch
);
