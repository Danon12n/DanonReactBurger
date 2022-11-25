import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { ingredientModalReducer } from "./ingredient-modal";
import { orderModalReducer } from "./order-modal";
import { usersReducer } from "./users";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredientModal: ingredientModalReducer,
    orderModal: orderModalReducer,
    users: usersReducer,
});
