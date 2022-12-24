import { feedModalReducer } from "./feed-modal";
import * as types from "../../action-types/feed-modal";

describe("burger Ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(feedModalReducer(undefined, {})).toEqual({
            feed: null,
            feedNumberRequest: false,
            feedNumberFailed: false,
        });
    });

    it("should handle GET_FEED_REQUEST", () => {
        expect(
            feedModalReducer(
                {
                    feed: null,
                    feedNumberRequest: false,
                    feedNumberFailed: false,
                },
                {
                    type: types.GET_FEED_REQUEST,
                }
            )
        ).toEqual({
            feed: null,
            feedNumberRequest: true,
            feedNumberFailed: false,
        });
    });
    it("should handle GET_FEED_SUCCESS", () => {
        expect(
            feedModalReducer(
                {
                    feed: null,
                    feedNumberRequest: true,
                    feedNumberFailed: false,
                },
                {
                    type: types.GET_FEED_SUCCESS,
                    payload: {
                        success: false,
                        ingredients: ["ingredient", "ingredient"],
                        _id: "_id",
                        status: "done",
                        name: "name",
                        number: 0,
                        createdAt: "createdAt",
                        updatedAt: "updatedAt",
                        owner: "owner",
                    },
                }
            )
        ).toEqual({
            feed: {
                success: false,
                ingredients: ["ingredient", "ingredient"],
                _id: "_id",
                status: "done",
                name: "name",
                number: 0,
                createdAt: "createdAt",
                updatedAt: "updatedAt",
                owner: "owner",
            },
            feedNumberRequest: false,
            feedNumberFailed: false,
        });
    });
    it("should handle GET_FEED_FAILED", () => {
        expect(
            feedModalReducer(
                {
                    feed: null,
                    feedNumberRequest: false,
                    feedNumberFailed: false,
                },
                {
                    type: types.GET_FEED_FAILED,
                }
            )
        ).toEqual({
            feed: null,
            feedNumberRequest: false,
            feedNumberFailed: true,
        });
    });
});
