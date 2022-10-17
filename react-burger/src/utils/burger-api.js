const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (response) => {
    return response.ok
        ? response.json()
        : response.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data.data;
            else return Promise.reject(data);
        });
};
