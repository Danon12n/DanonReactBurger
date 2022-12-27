import * as types from "../../action-types/burger-constructor";
import { burgerConstructorReducer } from "./burger-constructor";
import { generateTestIngedient } from "../../../utils/object-generator";

describe("burger constructor reducer", () => {
    it("should return the initial state", () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual({
            fillings: [],
            bun: null,
        });
    });

    it("should handle UPDATE_CONSTRUCTOR_BUN", () => {
        expect(
            burgerConstructorReducer(
                { fillings: [], bun: null },
                {
                    type: types.UPDATE_CONSTRUCTOR_BUN,
                    payload: { ...generateTestIngedient() },
                }
            )
        ).toEqual({
            fillings: [],
            bun: { ...generateTestIngedient() },
        });

        expect(
            burgerConstructorReducer(
                {
                    fillings: [],
                    bun: { ...generateTestIngedient() },
                },
                {
                    type: types.UPDATE_CONSTRUCTOR_BUN,
                    payload: { ...generateTestIngedient("_id1") },
                }
            )
        ).toEqual({
            fillings: [],
            bun: { ...generateTestIngedient("_id1") },
        });
    });

    it("should handle ADD_CONSTRUCTOR_INGREDIENT", () => {
        expect(
            burgerConstructorReducer(
                { fillings: [], bun: null },
                {
                    type: types.ADD_CONSTRUCTOR_INGREDIENT,
                    payload: { ...generateTestIngedient() },
                }
            )
        ).toEqual({
            fillings: [{ ...generateTestIngedient() }],
            bun: null,
        });
        expect(
            burgerConstructorReducer(
                {
                    fillings: [{ ...generateTestIngedient() }],
                    bun: null,
                },
                {
                    type: types.ADD_CONSTRUCTOR_INGREDIENT,
                    payload: { ...generateTestIngedient("_id1") },
                }
            )
        ).toEqual({
            fillings: [
                { ...generateTestIngedient() },
                { ...generateTestIngedient("_id1") },
            ],
            bun: null,
        });
    });

    it("should handle DELETE_CONSTRUCTOR_INGREDIENT", () => {
        expect(
            burgerConstructorReducer(
                {
                    fillings: [
                        { ...generateTestIngedient() },
                        { ...generateTestIngedient("_id1") },
                        { ...generateTestIngedient("_id2") },
                    ],
                    bun: null,
                },
                {
                    type: types.DELETE_CONSTRUCTOR_INGREDIENT,
                    payload: 1,
                }
            )
        ).toEqual({
            fillings: [
                { ...generateTestIngedient() },
                { ...generateTestIngedient("_id2") },
            ],
            bun: null,
        });
        expect(
            burgerConstructorReducer(
                {
                    fillings: [{ ...generateTestIngedient() }],
                    bun: null,
                },
                {
                    type: types.DELETE_CONSTRUCTOR_INGREDIENT,
                    payload: 0,
                }
            )
        ).toEqual({
            fillings: [],
            bun: null,
        });
    });

    it("should handle SWAP_CONSTRUCTOR_INGREDIENTS", () => {
        expect(
            burgerConstructorReducer(
                {
                    fillings: [
                        { ...generateTestIngedient() },
                        { ...generateTestIngedient("_id1") },
                        { ...generateTestIngedient("_id2") },
                    ],
                    bun: null,
                },
                {
                    type: types.SWAP_CONSTRUCTOR_INGREDIENTS,
                    payload: { dragIndex: 1, hoverIndex: 2 },
                }
            )
        ).toEqual({
            fillings: [
                { ...generateTestIngedient() },
                { ...generateTestIngedient("_id2") },
                { ...generateTestIngedient("_id1") },
            ],
            bun: null,
        });
    });
});
