import { bindActionCreators } from "redux";
import { IFeedMessage } from "../../types/types";
import {
    ORDERS_WS_CONNECTION_CLOSED,
    ORDERS_WS_CONNECTION_ERROR,
    ORDERS_WS_CONNECTION_START,
    ORDERS_WS_CONNECTION_SUCCESS,
    ORDERS_WS_GET_MESSAGE,
    ORDERS_WS_SEND_MESSAGE,
} from "../action-types/ordersWS";
import { store } from "../store";

export interface IOrdersWSConnectionStart {
    readonly type: typeof ORDERS_WS_CONNECTION_START;
    readonly payload: { wsUrl: string };
}
export interface IOrdersWSConnectionClosed {
    readonly type: typeof ORDERS_WS_CONNECTION_CLOSED;
}
export interface IOrdersWSConnectionError {
    readonly type: typeof ORDERS_WS_CONNECTION_ERROR;
}
export interface IOrdersWSConnectionSuccess {
    readonly type: typeof ORDERS_WS_CONNECTION_SUCCESS;
}
export interface IOrdersWSGetMessage {
    readonly type: typeof ORDERS_WS_GET_MESSAGE;
    readonly payload: IFeedMessage;
}
export interface IOrdersWSSendMessage {
    readonly type: typeof ORDERS_WS_SEND_MESSAGE;
}

export type TOrdersWSAction =
    | IOrdersWSConnectionClosed
    | IOrdersWSConnectionError
    | IOrdersWSConnectionStart
    | IOrdersWSConnectionSuccess
    | IOrdersWSGetMessage
    | IOrdersWSSendMessage;

const doOrdersWSConnectionStart = (
    wsUrl: string
): IOrdersWSConnectionStart => ({
    type: "ORDERS_WS_CONNECTION_START",
    payload: { wsUrl: wsUrl },
});
const doOrdersWSConnectionClosed = (): IOrdersWSConnectionClosed => ({
    type: "ORDERS_WS_CONNECTION_CLOSED",
});
const doOrdersWSConnectionError = (): IOrdersWSConnectionError => ({
    type: "ORDERS_WS_CONNECTION_ERROR",
});
const doOrdersWSConnectionSuccess = (): IOrdersWSConnectionSuccess => ({
    type: "ORDERS_WS_CONNECTION_SUCCESS",
});
const doOrdersWSGetMessage = (message: IFeedMessage): IOrdersWSGetMessage => ({
    type: "ORDERS_WS_GET_MESSAGE",
    payload: message,
});
const doOrdersWSSendMessage = (): IOrdersWSSendMessage => ({
    type: "ORDERS_WS_SEND_MESSAGE",
});

export const boundOrdersWS = bindActionCreators(
    {
        wsStart: doOrdersWSConnectionStart,
        wsClosed: doOrdersWSConnectionClosed,
        wsError: doOrdersWSConnectionError,
        wsSuccess: doOrdersWSConnectionSuccess,
        wsGetMessage: doOrdersWSGetMessage,
        wsSendMessage: doOrdersWSSendMessage,
    },
    store.dispatch
);
