const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export const checkResponse = (response:Response) => {
    return response.ok
        ? response.json()
        : response.json().then((err: Error) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data.data;
            else return Promise.reject(data);
        });
};

export const createOrder = (orderBody: Array<string>) => {
    return fetch(`${BURGER_API_URL}/orders`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: orderBody }),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};
