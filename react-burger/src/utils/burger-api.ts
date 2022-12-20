import { TIngredientWithCounter, TServerAnswer } from "../types/types";
import { getCookie } from "./cookie";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (response: Response) => {
    return response.ok
        ? response.json()
        : response.json().then((err: Error) => Promise.reject(err));
};

const checkSuccess = (data: TServerAnswer) => {
    if (data?.success) return data;
    else return Promise.reject(data);
};

export const request = (url: RequestInfo | URL, options?: RequestInit) => {
    return fetch(url, options).then(checkResponse).then(checkSuccess);
};

export const getIngredients = () => {
    return request(`${BURGER_API_URL}/ingredients`);
};

export const createOrder = (orderBody: Array<string>) => {
    const accessToken = getCookie("token");

    return request(`${BURGER_API_URL}/orders?token=${accessToken?.slice(7)}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: orderBody }),
    });
};

//поиск ингредиента по ID среди уникальных из стора
export const getIngredientById = (
    ingredientId: string,
    ingredients: TIngredientWithCounter[]
) => {
    const ingredient = ingredients.find((el: TIngredientWithCounter) => {
        if (el._id === ingredientId) return el;
    });
    return ingredient;
};