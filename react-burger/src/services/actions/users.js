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
    SET_USER_INFO,
    SET_AUTHED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_SUCCESS,
    SET_IS_CODE_SENT,
} from "../constant";
import {
    authUser,
    getUserInfo,
    logoutUser,
    registerUser,
    updateToken,
    updateUserInfo,
} from "../../utils/user-api";
import { deleteTokens, getCookie, setTokens } from "../../utils/cookie";

const doSetAuthed = (status) => ({
    type: SET_AUTHED,
    payload: status,
});

const doSetIsCodeSent = (status) => ({
    type: SET_IS_CODE_SENT,
    payload: status,
});

const doSetUserInfo = (userInfo) => ({
    type: SET_USER_INFO,
    payload: userInfo,
});

const doGetUserRequest = () => ({
    type: GET_USER_REQUEST,
});
const doGetUserSuccess = (userInfo) => ({
    type: GET_USER_SUCCESS,
    payload: userInfo,
});
const doGetUserFailed = () => ({
    type: GET_USER_FAILED,
});

const doUpdateUserInfoRequest = () => ({
    type: UPDATE_USER_INFO_REQUEST,
});
const doUpdateUserInfoSuccess = (userInfo) => ({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: userInfo,
});
const doUpdateUserInfoFailed = () => ({
    type: UPDATE_USER_INFO_FAILED,
});

const doRegisterRequest = () => ({
    type: REGISTER_REQUEST,
});
const doRegisterSuccess = (userInfo) => ({
    type: REGISTER_SUCCESS,
    payload: userInfo,
});
const doRegisterFailed = () => ({
    type: REGISTER_FAILED,
});

const doAuthRequest = () => ({
    type: AUTH_REQUEST,
});
const doAuthSuccess = (userInfo) => ({
    type: AUTH_SUCCESS,
    payload: userInfo,
});
const doAuthFailed = () => ({
    type: AUTH_FAILED,
});

const doLogoutRequest = () => ({
    type: LOGOUT_REQUEST,
});
const doLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});
const doLogoutFailed = () => ({
    type: LOGOUT_FAILED,
});

const doUpdateTokenRequest = () => ({
    type: UPDATE_TOKEN_REQUEST,
});
const doUpdateTokenSuccess = () => ({
    type: UPDATE_TOKEN_SUCCESS,
});
const doUpdateTokenFailed = () => ({
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

        setUserInfo: doSetUserInfo,

        setAuthed: doSetAuthed,

        isCodeSent: doSetIsCodeSent,
    },
    store.dispatch
);

export function registerUserAction(userInfo) {

        boundUser.registerRequest();
        registerUser(userInfo)
            .then((data) => {
                setTokens(data.accessToken, data.refreshToken);
                boundUser.registerSuccess(data);
                boundUser.setAuthed(true);
            })
            .catch((err) => {
                boundUser.registerFailed();
            });
    };

export function authUserAction(userInfo) {

        boundUser.authRequest();
        authUser(userInfo)
            .then((data) => {
                setTokens(data.accessToken, data.refreshToken);
                boundUser.authSuccess(data);
                boundUser.setAuthed(true);
            })
            .catch((err) => {
                boundUser.authFailed();
            });
    };


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
    };

export function updateTokenAction() {
    const token = {
        token: getCookie("refreshToken"),
    };
    updateToken(token)
        .then((data) => {
            setTokens(data.accessToken, data.refreshToken);
            console.log("tokens updated");
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
export function getUserAction() {
        boundUser.getUserRequest();
        getUserInfo(getCookie("token"))
            .then((data) => {
                boundUser.getUserSuccess(data);
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
    };

export function updateUserInfoAction(userInfo) {
    
        boundUser.updateUserInfoRequest();

        updateUserInfo(userInfo, getCookie("token"))
            .then((data) => {
                boundUser.updateUserInfoSuccess(data);
            })
            .catch((err) => {
                console.log(err);
                boundUser.updateUserInfoFailed();
            });
    };

