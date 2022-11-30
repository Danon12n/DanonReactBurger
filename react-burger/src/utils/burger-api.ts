import { TServerAnswer } from "../types/types";

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
    return request(`${BURGER_API_URL}/orders`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: orderBody }),
    });
};
