import { request } from "./burger-api";

import {
    TAuthUserBody,
    TLogoutUserBody,
    TRegisterUserBody,
    TResetPasswordBody,
    TUpdateTokenBody,
    TUpdateUserInfoBody,
} from "../types/types";
const USER_API_URL = "https://norma.nomoreparties.space/api";

export const resetPassword = (email: { email: string }) => {
    return request(`${USER_API_URL}/password-reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
    });
};

export const setNewPassword = (password: TResetPasswordBody) => {
    return request(`${USER_API_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
    });
};

export const registerUser = (userInfo: TRegisterUserBody) => {
    return request(`${USER_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
};

export const authUser = (userInfo: TAuthUserBody) => {
    return request(`${USER_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
};

export const logoutUser = (token: TLogoutUserBody) => {
    return request(`${USER_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
    });
};

export const updateToken = (token: TUpdateTokenBody) => {
    return request(`${USER_API_URL}/auth/token `, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
    });
};

export const getUserInfo = (token: string) => {
    return request(`${USER_API_URL}/auth/user`, {
        headers: {
            authorization: token,
        },
    });
};

export const updateUserInfo = (
    userInfo: TUpdateUserInfoBody,
    token: string
) => {
    return request(`${USER_API_URL}/auth/user `, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify(userInfo),
    });
};
