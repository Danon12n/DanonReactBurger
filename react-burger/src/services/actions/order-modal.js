import { store } from "../store";
import { bindActionCreators } from "redux";
import { createOrder } from "../../utils/burger-api";
import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
} from "../constant";

const doGetOrderNumberRequest = () => ({
    type: GET_ORDER_NUMBER_REQUEST,
});
const doGetOrderNumberFailed = () => ({
    type: GET_ORDER_NUMBER_FAILED,
});
const doGetOrderNumberSuccess = (orderNumber) => ({
    type: GET_ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
});

export const boundOrderModal = bindActionCreators(
    {
        orderRequest: doGetOrderNumberRequest,
        orderSuccess: doGetOrderNumberSuccess,
        orderFailed: doGetOrderNumberFailed,
    },
    store.dispatch
);

export function getOrderNumberAction(orderBody) {
    return function () {
        boundOrderModal.orderRequest();

        createOrder(orderBody)
            .then((data) => {
                boundOrderModal.orderSuccess(data.order.number);
            })
            .catch((err) => {
                boundOrderModal.orderFailed();
            });
    };
}
