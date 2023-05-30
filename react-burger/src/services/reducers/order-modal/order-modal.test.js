import { orderModalReducer } from "./order-modal";
import * as types from "../../action-types/order-modal";

describe("burger Ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(orderModalReducer(undefined, {})).toEqual({
            orderNumber: null,
            orderNumberRequest: false,
            orderNumberFailed: false,
        });
    });

    it("should handle GET_ORDER_NUMBER_REQUEST", () => {
        expect(
            orderModalReducer(
                {
                    orderNumber: null,
                    orderNumberRequest: false,
                    orderNumberFailed: false,
                },
                {
                    type: types.GET_ORDER_NUMBER_REQUEST,
                }
            )
        ).toEqual({
            orderNumber: null,
            orderNumberRequest: true,
            orderNumberFailed: false,
        });
    });
    it("should handle GET_ORDER_NUMBER_SUCCESS", () => {
        expect(
            orderModalReducer(
                {
                    orderNumber: null,
                    orderNumberRequest: true,
                    orderNumberFailed: false,
                },
                {
                    type: types.GET_ORDER_NUMBER_SUCCESS,
                    payload: 1234,
                }
            )
        ).toEqual({
            orderNumber: 1234,
            orderNumberRequest: false,
            orderNumberFailed: false,
        });
    });
    it("should handle GET_ORDER_NUMBER_FAILED", () => {
        expect(
            orderModalReducer(
                {
                    orderNumber: null,
                    orderNumberRequest: true,
                    orderNumberFailed: false,
                },
                {
                    type: types.GET_ORDER_NUMBER_FAILED,
                }
            )
        ).toEqual({
            orderNumber: null,
            orderNumberRequest: false,
            orderNumberFailed: true,
        });
    });
});
