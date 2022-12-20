import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
    FEED_WS_CONNECTION_CLOSED,
    FEED_WS_CONNECTION_ERROR,
    FEED_WS_CONNECTION_START,
    FEED_WS_CONNECTION_SUCCESS,
    FEED_WS_GET_MESSAGE,
    FEED_WS_SEND_MESSAGE,
} from "./action-types/feedWS";
import {
    ORDERS_WS_CONNECTION_CLOSED,
    ORDERS_WS_CONNECTION_ERROR,
    ORDERS_WS_CONNECTION_START,
    ORDERS_WS_CONNECTION_SUCCESS,
    ORDERS_WS_GET_MESSAGE,
    ORDERS_WS_SEND_MESSAGE,
} from "./action-types/ordersWS";

const TFeedActions = {
    wsStart: FEED_WS_CONNECTION_START,
    wsClosed: FEED_WS_CONNECTION_CLOSED,
    wsError: FEED_WS_CONNECTION_ERROR,
    wsSuccess: FEED_WS_CONNECTION_SUCCESS,
    wsGetMessage: FEED_WS_GET_MESSAGE,
    wsSendMessage: FEED_WS_SEND_MESSAGE,
};

const TOrdersActions = {
    wsStart: ORDERS_WS_CONNECTION_START,
    wsClosed: ORDERS_WS_CONNECTION_CLOSED,
    wsError: ORDERS_WS_CONNECTION_ERROR,
    wsSuccess: ORDERS_WS_CONNECTION_SUCCESS,
    wsGetMessage: ORDERS_WS_GET_MESSAGE,
    wsSendMessage: ORDERS_WS_SEND_MESSAGE,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: [
        thunk,
        socketMiddleware(TFeedActions),
        socketMiddleware(TOrdersActions),
    ],
});
