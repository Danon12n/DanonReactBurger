import { TUser } from "../../../types/types";
import { TUserAction } from "../../actions/user";

export type TUserState = {
    updateUserInfoRequest: boolean;
    updateUserInfoFailed: boolean;

    getUserRequest: boolean;
    getUserFailed: boolean;

    registerRequest: boolean;
    registerFailed: boolean;

    authRequest: boolean;
    authFailed: boolean;

    logoutRequest: boolean;
    logoutFailed: boolean;

    updateTokenRequest: boolean;
    updateTokenFailed: boolean;

    isAuthed: boolean | null;
    isCodeSent: boolean;

    user: TUser | null;
};

const initialState: TUserState = {
    updateUserInfoRequest: false,
    updateUserInfoFailed: false,

    getUserRequest: false,
    getUserFailed: false,

    registerRequest: false,
    registerFailed: false,

    authRequest: false,
    authFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    updateTokenRequest: false,
    updateTokenFailed: false,

    isAuthed: null,
    isCodeSent: false,

    user: null,
};

export const userReducer = (state = initialState, action: TUserAction) => {
    switch (action.type) {
        case "SET_IS_CODE_SENT":
            return {
                ...state,
                isCodeSent: action.payload,
            };
        case "SET_AUTHED":
            return {
                ...state,
                isAuthed: action.payload,
            };
        case "UPDATE_USER_INFO_REQUEST":
            return {
                ...state,
                updateUserInfoRequest: true,
                updateUserInfoFailed: false,
            };
        case "UPDATE_USER_INFO_SUCCESS":
            return {
                ...state,
                updateUserInfoRequest: false,
                user: {
                    ...action.payload,
                },
            };
        case "UPDATE_USER_INFO_FAILED":
            return {
                ...state,
                updateUserInfoRequest: false,
                updateUserInfoFailed: true,
            };
        case "GET_USER_REQUEST":
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
            };
        case "GET_USER_SUCCESS":
            return {
                ...state,
                getUserRequest: false,
                user: {
                    ...action.payload,
                },
            };
        case "GET_USER_FAILED":
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
            };
        case "REGISTER_REQUEST":
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                registerRequest: false,
                user: {
                    ...action.payload,
                },
            };
        case "REGISTER_FAILED":
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
            };
        case "AUTH_REQUEST":
            return {
                ...state,
                authRequest: true,
                authFailed: false,
            };
        case "AUTH_SUCCESS":
            return {
                ...state,
                authRequest: false,
                user: {
                    ...action.payload,
                },
            };
        case "AUTH_FAILED":
            return {
                ...state,
                authRequest: false,
                authFailed: true,
            };
        case "LOGOUT_REQUEST":
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false,
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                logoutFailed: false,
                logoutRequest: false,
                user: null,
            };
        case "LOGOUT_FAILED":
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
            };
        case "UPDATE_TOKEN_REQUEST":
            return {
                ...state,
                updateTokenRequest: true,
                updateTokenFailed: false,
            };
        case "UPDATE_TOKEN_SUCCESS":
            return {
                ...state,
                updateTokenRequest: false,
            };
        case "UPDATE_TOKEN_FAILED":
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: true,
            };

        default:
            return state;
    }
};
