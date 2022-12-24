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

    it("should handle INCREASE_INGREDIENT_COUNTER", () => {
        expect(
            userReducer(
                {
                    ingredients: [
                        // prettier-ignore
                        { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,0,"") },
                        // prettier-ignore
                        { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,0,"") },
                    ],
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: types.INCREASE_INGREDIENT_COUNTER,
                    payload: "_id",
                }
            )
        ).toEqual({
            ingredients: [
                // prettier-ignore
                { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,1,"") },
                // prettier-ignore
                { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,0,"") },
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
        });

        expect(
            userReducer(
                {
                    ingredients: [
                        // prettier-ignore
                        { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,0,"") },
                        // prettier-ignore
                        { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,0,"") },
                    ],
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: types.INCREASE_INGREDIENT_COUNTER,
                    payload: "_id1",
                }
            )
        ).toEqual({
            ingredients: [
                // prettier-ignore
                { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,0,"") },
                // prettier-ignore
                { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,2,"") },
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
        });
    });

    it("should handle DECREASE_INGREDIENT_COUNTER", () => {
        expect(
            userReducer(
                {
                    ingredients: [
                        // prettier-ignore
                        { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,1,"") },
                        // prettier-ignore
                        { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,0,"") },
                    ],
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: types.DECREASE_INGREDIENT_COUNTER,
                    payload: "_id",
                }
            )
        ).toEqual({
            ingredients: [
                // prettier-ignore
                { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,0,"") },
                // prettier-ignore
                { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,0,"") },
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
        });

        expect(
            userReducer(
                {
                    ingredients: [
                        // prettier-ignore
                        { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,0,"") },
                        // prettier-ignore
                        { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,2,"") },
                    ],
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: types.DECREASE_INGREDIENT_COUNTER,
                    payload: "_id1",
                }
            )
        ).toEqual({
            ingredients: [
                // prettier-ignore
                { ...generateTestIngedient("_id","","souce",0,0,0,0,0,"","","",0,0,"") },
                // prettier-ignore
                { ...generateTestIngedient("_id1","","bun",0,0,0,0,0,"","","",0,0,"") },
            ],
            ingredientsRequest: false,
            ingredientsFailed: false,
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
});
