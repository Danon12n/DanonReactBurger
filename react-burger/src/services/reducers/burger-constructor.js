import {
    UPDATE_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    SWAP_CONSTRUCTOR_INGREDIENTS,
    DELETE_CONSTRUCTOR_INGREDIENT,
} from "../constant";

const initialState = {
    fillings: [],
    bun: null,
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_BUN:
            return {
                ...state,
                bun: action.payload,
            };
        case ADD_CONSTRUCTOR_INGREDIENT:
            return {
                ...state,
                fillings: [...state.fillings, action.payload],
            };
        case DELETE_CONSTRUCTOR_INGREDIENT:
            return {
                ...state,
                fillings: [
                    ...state.fillings.filter((elem, i) => {
                        if (action.payload !== i) return elem;
                    }),
                ],
            };
        case SWAP_CONSTRUCTOR_INGREDIENTS:
            const new_fillings = state.fillings.map((el) => {
                return el;
            });
            const dragCard = new_fillings[action.payload.dragIndex];
            new_fillings.splice(action.payload.dragIndex, 1);
            new_fillings.splice(action.payload.hoverIndex, 0, dragCard);
            return {
                ...state,
                ...state.ingredientsInConstructor,
                fillings: [...new_fillings],
            };
        default:
            return state;
    }
};
