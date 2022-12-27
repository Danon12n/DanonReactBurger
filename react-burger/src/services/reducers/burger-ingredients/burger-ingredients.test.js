import { burgerIngredientsReducer } from "./burger-ingredients";
import * as types from "../../action-types/burger-ingredients";
import { generateTestIngedient } from "../../../utils/object-generator";

describe("burger Ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
        });
    });

    it("should handle INCREASE_INGREDIENT_COUNTER", () => {
        expect(
            burgerIngredientsReducer(
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
            burgerIngredientsReducer(
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
            burgerIngredientsReducer(
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
            burgerIngredientsReducer(
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

    it("should handle GET_INGREDIENTS_REQUEST", () => {
        expect(
            burgerIngredientsReducer(
                {
                    ingredients: [],
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: types.GET_INGREDIENTS_REQUEST,
                }
            )
        ).toEqual({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false,
        });
    });
    it("should handle GET_INGREDIENTS_SUCCESS", () => {
        expect(
            burgerIngredientsReducer(
                {
                    ingredients: [],
                    ingredientsRequest: true,
                    ingredientsFailed: false,
                },
                {
                    type: types.GET_INGREDIENTS_SUCCESS,
                    payload: [
                        {
                            ...generateTestIngedient(),
                        },
                    ],
                }
            )
        ).toEqual({
            ingredients: [{ ...generateTestIngedient() }],
            ingredientsRequest: false,
            ingredientsFailed: false,
        });
    });
    it("should handle GET_INGREDIENTS_FAILED", () => {
        expect(
            burgerIngredientsReducer(
                {
                    ingredients: [],
                    ingredientsRequest: false,
                    ingredientsFailed: false,
                },
                {
                    type: types.GET_INGREDIENTS_FAILED,
                }
            )
        ).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: true,
        });
    });
});
