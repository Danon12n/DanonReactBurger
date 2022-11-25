import { checkResponse } from "./burger-api";
import { TAuthUserBody, TLogoutUserBody, TRegisterUserBody, TResetPasswordBody, TUpdateTokenBody, TUpdateUserInfoBody } from "../types/types";
const USER_API_URL = "https://norma.nomoreparties.space/api";

export const ResetPassword = (email:{email:string}) => {
    return fetch(`${USER_API_URL}/password-reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};



export const SetNewPassword = (password:TResetPasswordBody) => {
    return fetch(`${USER_API_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};


export const registerUser = (userInfo:TRegisterUserBody) => {
    return fetch(`${USER_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};

export const authUser = (userInfo:TAuthUserBody) => {
    return fetch(`${USER_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};

export const logoutUser = (token:TLogoutUserBody) => {
    return fetch(`${USER_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};

export const updateToken = (token:TUpdateTokenBody) => {
    return fetch(`${USER_API_URL}/auth/token `, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};

export const getUserInfo = (token:string) => {
    return fetch(`${USER_API_URL}/auth/user`, {
        headers: {
            authorization: token,
        },
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};

export const updateUserInfo = (userInfo:TUpdateUserInfoBody, token:string) => {
    return fetch(`${USER_API_URL}/auth/user `, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify(userInfo),
    })
        .then(checkResponse)
        .then((data) => {
            if (data?.success) return data;
            else return Promise.reject(data);
        });
};
