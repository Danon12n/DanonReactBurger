import { feedWSReducer } from "./feedWS";
import * as types from "../../action-types/feedWS";

describe("burger Ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(feedWSReducer(undefined, {})).toEqual({
            wsConnected: false,
            error: false,
            feed: null,
        });
    });

    it("should handle FEED_WS_CONNECTION_START", () => {
        expect(
            feedWSReducer(
                {
                    wsConnected: false,
                    error: false,
                    feed: null,
                },
                {
                    type: types.FEED_WS_CONNECTION_START,
                }
            )
        ).toEqual({
            wsConnected: false,
            error: false,
            feed: null,
        });
    });
    it("should handle FEED_WS_CONNECTION_SUCCESS", () => {
        expect(
            feedWSReducer(
                {
                    wsConnected: false,
                    error: false,
                    feed: null,
                },
                {
                    type: types.FEED_WS_CONNECTION_SUCCESS,
                }
            )
        ).toEqual({
            wsConnected: true,
            error: false,
            feed: null,
        });
    });
    it("should handle FEED_WS_CONNECTION_ERROR", () => {
        expect(
            feedWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.FEED_WS_CONNECTION_ERROR,
                }
            )
        ).toEqual({
            wsConnected: false,
            error: true,
            feed: null,
        });
    });
    it("should handle FEED_WS_CONNECTION_CLOSED", () => {
        expect(
            feedWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.FEED_WS_CONNECTION_CLOSED,
                }
            )
        ).toEqual({
            wsConnected: false,
            error: false,
            feed: null,
        });
    });
    it("should handle FEED_WS_SEND_MESSAGE", () => {
        expect(
            feedWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.FEED_WS_SEND_MESSAGE,
                }
            )
        ).toEqual({
            wsConnected: true,
            error: false,
            feed: null,
        });
    });
    it("should handle FEED_WS_GET_MESSAGE", () => {
        expect(
            feedWSReducer(
                {
                    wsConnected: true,
                    error: false,
                    feed: null,
                },
                {
                    type: types.FEED_WS_GET_MESSAGE,
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
