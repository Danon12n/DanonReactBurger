import { store } from "../store";
import { bindActionCreators } from "redux";
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    UPDATE_TOKEN_FAILED,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    SET_AUTHED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_SUCCESS,
    SET_IS_CODE_SENT,
} from "../action-types/user";
import {
    authUser,
    getUserInfo,
    logoutUser,
    registerUser,
    updateToken,
    updateUserInfo,
} from "../../utils/user-api";
import {
    TAuthUserBody,
    TRegisterUserBody,
    TUpdateUserInfoBody,
    TUserInfo,
} from "../../types/types";

import { deleteTokens, getCookie, setTokens } from "../../utils/cookie";

//types

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: TUserInfo | undefined;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: TUserInfo | undefined;
}
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserInfoRequestAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export interface IUpdateUserInfoSuccessAction {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    readonly payload: TUserInfo | undefined;
}
export interface IUpdateUserInfoFailedAction {
    readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export interface IAuthRequestAction {
    readonly type: typeof AUTH_REQUEST;
}
export interface IAuthSuccessAction {
    readonly type: typeof AUTH_SUCCESS;
    readonly payload: TUserInfo | undefined;
}
export interface IAuthFailedAction {
    readonly type: typeof AUTH_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
export interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
}

export interface ISetAuthed {
    readonly type: typeof SET_AUTHED;
    readonly payload: boolean;
}
export interface ISetIsCodeSent {
    readonly type: typeof SET_IS_CODE_SENT;
    readonly payload: boolean;
}
export type TUserAction =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenFailedAction
    | IUpdateUserInfoRequestAction
    | IUpdateUserInfoSuccessAction
    | IUpdateUserInfoFailedAction
    | IAuthRequestAction
    | IAuthSuccessAction
    | IAuthFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | ISetAuthed
    | ISetIsCodeSent;

//types

const doSetAuthed = (status: boolean): ISetAuthed => ({
    type: SET_AUTHED,
    payload: status,
});

const doSetIsCodeSent = (status: boolean): ISetIsCodeSent => ({
    type: SET_IS_CODE_SENT,
    payload: status,
});

const doGetUserRequest = (): IGetUserRequestAction => ({
    type: GET_USER_REQUEST,
});
const doGetUserSuccess = (
    userInfo: TUserInfo | undefined
): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    payload: userInfo,
});
const doGetUserFailed = (): IGetUserFailedAction => ({
    type: GET_USER_FAILED,
});

const doUpdateUserInfoRequest = (): IUpdateUserInfoRequestAction => ({
    type: UPDATE_USER_INFO_REQUEST,
});
const doUpdateUserInfoSuccess = (
    userInfo: TUserInfo | undefined
): IUpdateUserInfoSuccessAction => ({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: userInfo,
});
const doUpdateUserInfoFailed = (): IUpdateUserInfoFailedAction => ({
    type: UPDATE_USER_INFO_FAILED,
});

const doRegisterRequest = (): IRegisterRequestAction => ({
    type: REGISTER_REQUEST,
});
const doRegisterSuccess = (
    userInfo: TUserInfo | undefined
): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    payload: userInfo,
});
const doRegisterFailed = (): IRegisterFailedAction => ({
    type: REGISTER_FAILED,
});

const doAuthRequest = (): IAuthRequestAction => ({
    type: AUTH_REQUEST,
});
const doAuthSuccess = (userInfo: TUserInfo | undefined): IAuthSuccessAction => ({
    type: AUTH_SUCCESS,
    payload: userInfo,
});
const doAuthFailed = (): IAuthFailedAction => ({
    type: AUTH_FAILED,
});

const doLogoutRequest = (): ILogoutRequestAction => ({
    type: LOGOUT_REQUEST,
});
const doLogoutSuccess = (): ILogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
});
const doLogoutFailed = (): ILogoutFailedAction => ({
    type: LOGOUT_FAILED,
});

const doUpdateTokenRequest = (): IUpdateTokenRequestAction => ({
    type: UPDATE_TOKEN_REQUEST,
});
const doUpdateTokenSuccess = (): IUpdateTokenSuccessAction => ({
    type: UPDATE_TOKEN_SUCCESS,
});
const doUpdateTokenFailed = (): IUpdateTokenFailedAction => ({
    type: UPDATE_TOKEN_FAILED,
});

export const boundUser = bindActionCreators(
    {
        updateUserInfoRequest: doUpdateUserInfoRequest,
        updateUserInfoSuccess: doUpdateUserInfoSuccess,
        updateUserInfoFailed: doUpdateUserInfoFailed,

        getUserRequest: doGetUserRequest,
        getUserSuccess: doGetUserSuccess,
        getUserFailed: doGetUserFailed,

        registerRequest: doRegisterRequest,
        registerSuccess: doRegisterSuccess,
        registerFailed: doRegisterFailed,

        authRequest: doAuthRequest,
        authSuccess: doAuthSuccess,
        authFailed: doAuthFailed,

        updateTokenRequest: doUpdateTokenRequest,
        updateTokenSuccess: doUpdateTokenSuccess,
        updateTokenFailed: doUpdateTokenFailed,

        logoutRequest: doLogoutRequest,
        logoutSuccess: doLogoutSuccess,
        logoutFailed: doLogoutFailed,

        setAuthed: doSetAuthed,

        isCodeSent: doSetIsCodeSent,
    },
    store.dispatch
);

export function registerUserAction(userInfo: TRegisterUserBody) {
    boundUser.registerRequest();
    registerUser(userInfo)
        .then((data) => {
            if (data.accessToken && data.refreshToken) {
                setTokens(data.accessToken, data.refreshToken);
                boundUser.registerSuccess(data.user);
                boundUser.setAuthed(true);
            }
        })
        .catch((err) => {
            boundUser.registerFailed();
        });
}

export function authUserAction(userInfo: TAuthUserBody) {
    boundUser.authRequest();
    authUser(userInfo)
        .then((data) => {
            if (data.accessToken && data.refreshToken) {
                setTokens(data.accessToken, data.refreshToken);
                boundUser.authSuccess(data.user);
                boundUser.setAuthed(true);
            }
        })
        .catch((err) => {
            boundUser.authFailed();
        });
}

export function logoutUserAction() {
    boundUser.logoutRequest();
    const token = {
        token: `${getCookie("refreshToken")}`,
    };
    logoutUser(token)
        .then((data) => {
            boundUser.logoutSuccess();
            deleteTokens();
            boundUser.setAuthed(false);
        })
        .catch((err) => {
            console.log(err);
            boundUser.logoutFailed();
        });
}

export function updateTokenAction() {
    let refreshToken = getCookie("refreshToken");
    if (refreshToken) {
        const token = {
            token: refreshToken,
        };
        if (token)
            updateToken(token)
                .then((data) => {
                    if (data.accessToken && data.refreshToken) {
                        setTokens(data.accessToken, data.refreshToken);
                        console.log("tokens updated");
                    }
                })
                .catch((err) => {
                    if (err.message === "Token is invalid") {
                        console.log("refresh token is invalid. logging out");
                        deleteTokens();
                        boundUser.setAuthed(false);
                    }
                    console.log(err);
                });
    }
}
export function getUserAction() {
    boundUser.getUserRequest();
    let accessToken = getCookie("token");
    if (accessToken) {
        getUserInfo(accessToken)
            .then((data) => {
                boundUser.getUserSuccess(data.user);
            })
            .catch((err) => {
                if (err.message === "jwt expired") {
                    console.log("jwt expired, tring to update tokens");
                    updateTokenAction();
                } else {
                    console.log("other error, logging out");
                    boundUser.getUserFailed();
                    boundUser.setAuthed(false);
                    deleteTokens();
                }
            });
    }
}

export function updateUserInfoAction(userInfo: TUpdateUserInfoBody) {
    boundUser.updateUserInfoRequest();
    let accessToken = getCookie("token");
    if (accessToken) {
        updateUserInfo(userInfo, accessToken)
            .then((data) => {
                boundUser.updateUserInfoSuccess(data.user);
            })
            .catch((err) => {
                console.log(err);
                boundUser.updateUserInfoFailed();
            });
    }
}
