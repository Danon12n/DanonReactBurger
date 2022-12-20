import { TIngredientWithCounter } from "../../types/types";

import { TBurgerConstructorAction } from "../actions/burger-constructor";

export type TBurgerConstructorState = {
    fillings: Array<TIngredientWithCounter>;
    bun: TIngredientWithCounter | null;
};

const initialState: TBurgerConstructorState = {
    fillings: [],
    bun: null,
};

export const burgerConstructorReducer = (
    state = initialState,
    action: TBurgerConstructorAction
) => {
    switch (action.type) {
        case "UPDATE_CONSTRUCTOR_BUN":
            return {
                ...state,
                bun: action.payload,
            };
        case "ADD_CONSTRUCTOR_INGREDIENT":
            return {
                ...state,
                fillings: [...state.fillings, action.payload],
            };
        case "DELETE_CONSTRUCTOR_INGREDIENT":
            return {
                ...state,
                fillings: [
                    ...state.fillings.filter((elem, i) => action.payload !== i),
                ],
            };
        case "SWAP_CONSTRUCTOR_INGREDIENTS":
            const new_fillings = [...state.fillings];
            const dragCard = new_fillings[action.payload.dragIndex];
            new_fillings.splice(action.payload.dragIndex, 1);
            new_fillings.splice(action.payload.hoverIndex, 0, dragCard);
            return {
                ...state,
                fillings: [...new_fillings],
            };
        default:
            return state;
    }
};
