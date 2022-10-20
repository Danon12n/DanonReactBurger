import { createOrder, getIngredients } from "../../utils/burger-api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_CONSTRUCTOR_INGREDIENTS = "SET_CONSTRUCTOR_INGREDIENTS";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const SET_ORDER_NUMBER = "UPDATE_ORDER_NUMBER";

export function getIngredientsAction() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS,
        });

        getIngredients()
            .then((data) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data,
                });
            })
            .catch(() => {
                alert("Возникла ошибка при загрузк ингедиентов");
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}

export function getOrderNumberAction(orderBody) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER,
        });

        createOrder(orderBody)
            .then((data) => {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: data.order.number,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
                });
            });
    };
}
