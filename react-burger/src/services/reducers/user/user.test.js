import { userReducer } from "./user";
import * as types from "../../action-types/user";
import { generateTestIngedient } from "../../../utils/object-generator";

describe("burger Ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(userReducer(undefined, {})).toEqual({
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
        });
    });

    it("should handle SET_IS_CODE_SENT", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.SET_IS_CODE_SENT,
                    payload: true,
                }
            )
        ).toEqual({
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
            isCodeSent: true,

            user: null,
        });
    });

    it("should handle SET_AUTHED", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.SET_AUTHED,
                    payload: true,
                }
            )
        ).toEqual({
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

            isAuthed: true,
            isCodeSent: false,

            user: null,
        });

        expect(
            userReducer(
                {
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

                    isAuthed: true,
                    isCodeSent: false,

                    user: null,
                },
                {
                    type: types.SET_AUTHED,
                    payload: false,
                }
            )
        ).toEqual({
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

            isAuthed: false,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle GET_USER_REQUEST", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.GET_USER_REQUEST,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: true,
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
        });
    });

    it("should handle GET_USER_SUCCESS", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: true,
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
                },
                {
                    type: types.GET_USER_SUCCESS,
                    payload: {
                        email: "email",
                        name: "name",
                    },
                }
            )
        ).toEqual({
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

            user: {
                email: "email",
                name: "name",
            },
        });
    });

    it("should handle GET_USER_FAILED", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: true,
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
                },
                {
                    type: types.GET_USER_FAILED,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: true,

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
        });
    });

    it("should handle REGISTER_REQUEST", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.REGISTER_REQUEST,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: false,

            registerRequest: true,
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
        });
    });

    it("should handle REGISTER_SUCCESS", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: false,
                    getUserFailed: false,

                    registerRequest: true,
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
                },
                {
                    type: types.REGISTER_SUCCESS,
                    payload: {
                        email: "email",
                        name: "name",
                    },
                }
            )
        ).toEqual({
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

            user: {
                email: "email",
                name: "name",
            },
        });
    });

    it("should handle REGISTER_FAILED", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: false,
                    getUserFailed: false,

                    registerRequest: true,
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
                },
                {
                    type: types.REGISTER_FAILED,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: false,

            registerRequest: false,
            registerFailed: true,

            authRequest: false,
            authFailed: false,

            logoutRequest: false,
            logoutFailed: false,

            updateTokenRequest: false,
            updateTokenFailed: false,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle AUTH_REQUEST", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.AUTH_REQUEST,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: false,

            registerRequest: false,
            registerFailed: false,

            authRequest: true,
            authFailed: false,

            logoutRequest: false,
            logoutFailed: false,

            updateTokenRequest: false,
            updateTokenFailed: false,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle AUTH_SUCCESS", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: false,
                    getUserFailed: false,

                    registerRequest: false,
                    registerFailed: false,

                    authRequest: true,
                    authFailed: false,

                    logoutRequest: false,
                    logoutFailed: false,

                    updateTokenRequest: false,
                    updateTokenFailed: false,

                    isAuthed: null,
                    isCodeSent: false,

                    user: null,
                },
                {
                    type: types.AUTH_SUCCESS,
                    payload: {
                        email: "email",
                        name: "name",
                    },
                }
            )
        ).toEqual({
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

            user: {
                email: "email",
                name: "name",
            },
        });
    });

    it("should handle AUTH_FAILED", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: false,
                    getUserFailed: false,

                    registerRequest: false,
                    registerFailed: false,

                    authRequest: true,
                    authFailed: false,

                    logoutRequest: false,
                    logoutFailed: false,

                    updateTokenRequest: false,
                    updateTokenFailed: false,

                    isAuthed: null,
                    isCodeSent: false,

                    user: null,
                },
                {
                    type: types.AUTH_FAILED,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: false,

            registerRequest: false,
            registerFailed: false,

            authRequest: false,
            authFailed: true,

            logoutRequest: false,
            logoutFailed: false,

            updateTokenRequest: false,
            updateTokenFailed: false,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle UPDATE_USER_INFO_REQUEST", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.UPDATE_USER_INFO_REQUEST,
                }
            )
        ).toEqual({
            updateUserInfoRequest: true,
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
        });
    });

    it("should handle UPDATE_USER_INFO_SUCCESS", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: true,
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
                },
                {
                    type: types.UPDATE_USER_INFO_SUCCESS,
                    payload: {
                        email: "email",
                        name: "name",
                    },
                }
            )
        ).toEqual({
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

            user: {
                email: "email",
                name: "name",
            },
        });
    });

    it("should handle UPDATE_USER_INFO_FAILED", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: true,
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
                },
                {
                    type: types.UPDATE_USER_INFO_FAILED,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: true,

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
        });
    });

    it("should handle UPDATE_TOKEN_REQUEST", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.UPDATE_TOKEN_REQUEST,
                }
            )
        ).toEqual({
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

            updateTokenRequest: true,
            updateTokenFailed: false,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle UPDATE_TOKEN_SUCCESS", () => {
        expect(
            userReducer(
                {
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

                    updateTokenRequest: true,
                    updateTokenFailed: false,

                    isAuthed: null,
                    isCodeSent: false,

                    user: null,
                },
                {
                    type: types.UPDATE_TOKEN_SUCCESS,
                }
            )
        ).toEqual({
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
        });
    });

    it("should handle UPDATE_USER_INFO_FAILED", () => {
        expect(
            userReducer(
                {
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

                    updateTokenRequest: true,
                    updateTokenFailed: false,

                    isAuthed: null,
                    isCodeSent: false,

                    user: null,
                },
                {
                    type: types.UPDATE_TOKEN_FAILED,
                }
            )
        ).toEqual({
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
            updateTokenFailed: true,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle LOGOUT_REQUEST", () => {
        expect(
            userReducer(
                {
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
                },
                {
                    type: types.LOGOUT_REQUEST,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: false,

            registerRequest: false,
            registerFailed: false,

            authRequest: false,
            authFailed: false,

            logoutRequest: true,
            logoutFailed: false,

            updateTokenRequest: false,
            updateTokenFailed: false,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });

    it("should handle LOGOUT_SUCCESS", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: false,
                    getUserFailed: false,

                    registerRequest: false,
                    registerFailed: false,

                    authRequest: false,
                    authFailed: false,

                    logoutRequest: true,
                    logoutFailed: false,

                    updateTokenRequest: false,
                    updateTokenFailed: false,

                    isAuthed: null,
                    isCodeSent: false,

                    user: {
                        email: "email",
                        name: "name",
                    },
                },
                {
                    type: types.LOGOUT_SUCCESS,
                }
            )
        ).toEqual({
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
        });
    });

    it("should handle LOGOUT_FAILED", () => {
        expect(
            userReducer(
                {
                    updateUserInfoRequest: false,
                    updateUserInfoFailed: false,

                    getUserRequest: false,
                    getUserFailed: false,

                    registerRequest: false,
                    registerFailed: false,

                    authRequest: false,
                    authFailed: false,

                    logoutRequest: true,
                    logoutFailed: false,

                    updateTokenRequest: false,
                    updateTokenFailed: false,

                    isAuthed: null,
                    isCodeSent: false,

                    user: null,
                },
                {
                    type: types.LOGOUT_FAILED,
                }
            )
        ).toEqual({
            updateUserInfoRequest: false,
            updateUserInfoFailed: false,

            getUserRequest: false,
            getUserFailed: false,

            registerRequest: false,
            registerFailed: false,

            authRequest: false,
            authFailed: false,

            logoutRequest: false,
            logoutFailed: true,

            updateTokenRequest: false,
            updateTokenFailed: false,

            isAuthed: null,
            isCodeSent: false,

            user: null,
        });
    });
});
