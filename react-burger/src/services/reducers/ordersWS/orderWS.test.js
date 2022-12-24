import { ordersWSReducer } from "./ordersWS";
import * as types from "../../action-types/ordersWS";

describe("burger Ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(ordersWSReducer(undefined, {})).toEqual({
            wsConnected: false,
            error: false,
            feed: null,
        });
    });

    it("should handle ORDERS_WS_CONNECTION_START", () => {
        expect(
            ordersWSReducer(
                {
                    wsConnected: false,
                    error: false,
                    feed: null,
                },
                {
                    type: types.ORDERS_WS_CONNECTION_START,
                }
            )
        ).toEqual({
            wsConnected: false,
            error: false,
            feed: null,
        });
    });
    it("should handle ORDERS_WS_CONNECTION_SUCCESS", () => {
        expect(
            ordersWSReducer(
                {
                    wsConnected: false,
                    error: false,
                    feed: null,
                },
                {
                    type: types.ORDERS_WS_CONNECTION_SUCCESS,
                }
            )
        ).toEqual({
            wsConnected: true,
            error: false,
            feed: null,
        });
    });
    it("should handle ORDERS_WS_CONNECTION_ERROR", () => {
        expect(
            ordersWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.ORDERS_WS_CONNECTION_ERROR,
                }
            )
        ).toEqual({
            wsConnected: false,
            error: true,
            feed: null,
        });
    });
    it("should handle ORDERS_WS_CONNECTION_CLOSED", () => {
        expect(
            ordersWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.ORDERS_WS_CONNECTION_CLOSED,
                }
            )
        ).toEqual({
            wsConnected: false,
            error: false,
            feed: null,
        });
    });
    it("should handle ORDERS_WS_SEND_MESSAGE", () => {
        expect(
            ordersWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.ORDERS_WS_SEND_MESSAGE,
                }
            )
        ).toEqual({
            wsConnected: true,
            error: false,
            feed: null,
        });
    });
    it("should handle ORDERS_WS_GET_MESSAGE", () => {
        expect(
            ordersWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.ORDERS_WS_GET_MESSAGE,
                    payload: {
                        success: true,
                        orders: [],
                        total: 10,
                        totalToday: 2,
                    },
                }
            )
        ).toEqual({
            wsConnected: true,
            error: false,
            feed: {
                success: true,
                orders: [],
                total: 10,
                totalToday: 2,
            },
        });
    });
});
