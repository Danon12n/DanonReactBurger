import * as types from "../../action-types/ingredient-modal";
import { ingredientModalReducer } from "./ingredient-modal";
import { generateTestIngedient } from "../../../utils/object-generator";

describe("burger constructor reducer", () => {
    it("should return the initial state", () => {
        expect(ingredientModalReducer(undefined, {})).toEqual({
            currentIngredient: null,
        });
    });

    it("should handle SET_CURRENT_INGREDIENT", () => {
        expect(
            ingredientModalReducer(
                { currentIngredient: null },
                {
                    type: types.SET_CURRENT_INGREDIENT,
                    payload: { ...generateTestIngedient() },
                }
            )
        ).toEqual({ currentIngredient: { ...generateTestIngedient() } });

        expect(
            ingredientModalReducer(
                { currentIngredient: { ...generateTestIngedient("_id") } },
                {
                    type: types.SET_CURRENT_INGREDIENT,
                    payload: { ...generateTestIngedient("_id1") },
                }
            )
        ).toEqual({ currentIngredient: { ...generateTestIngedient("_id1") } });
    });

    it("should handle DELETE_CURRENT_INGREDIENT", () => {
        expect(
            ingredientModalReducer(
                { currentIngredient: { ...generateTestIngedient() } },
                { type: types.DELETE_CURRENT_INGREDIENT }
            )
        ).toEqual({ currentIngredient: null });
        expect(
            ingredientModalReducer(
                { currentIngredient: null },
                { type: types.DELETE_CURRENT_INGREDIENT }
            )
        ).toEqual({ currentIngredient: null });
    });
});
