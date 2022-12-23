import { store } from "../store";
import { bindActionCreators } from "redux";
import { createOrder } from "../../utils/burger-api";
import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
} from "../action-types/order-modal";

export interface IGetOrderNumberRequest {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}
export interface IGetOrderNumberSuccess {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    payload: number;
}
export interface IGetOrderNumberFailed {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export type TOrderModalAction =
    | IGetOrderNumberRequest
    | IGetOrderNumberSuccess
    | IGetOrderNumberFailed;

const doGetOrderNumberRequest = () => ({
    type: GET_ORDER_NUMBER_REQUEST,
});
const doGetOrderNumberSuccess = (orderNumber: number) => ({
    type: GET_ORDER_NUMBER_SUCCESS,
    payload: orderNumber,
});
const doGetOrderNumberFailed = () => ({
    type: GET_ORDER_NUMBER_FAILED,
});

export const boundOrderModal = bindActionCreators(
    {
        orderRequest: doGetOrderNumberRequest,
        orderSuccess: doGetOrderNumberSuccess,
        orderFailed: doGetOrderNumberFailed,
    },
    store.dispatch
);

export function getOrderNumberAction(orderBody: Array<string>) {
    boundOrderModal.orderRequest();

    createOrder(orderBody)
        .then((data) => {
            if (data.order) boundOrderModal.orderSuccess(data.order.number);
        })
        .catch((err) => {
            boundOrderModal.orderFailed();
        });
}
