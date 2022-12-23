import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { ingredientModalReducer } from "./ingredient-modal";
import { orderModalReducer } from "./order-modal";
import { userReducer } from "./user";
import { feedWSReducer } from "./feedWS";
import { ordersWSReducer } from "./ordersWS";
import { feedModalReducer } from "./feed-modal";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredientModal: ingredientModalReducer,
    orderModal: orderModalReducer,
    user: userReducer,
    feeds: feedWSReducer,
    orders: ordersWSReducer,
    feedModal: feedModalReducer,
});
