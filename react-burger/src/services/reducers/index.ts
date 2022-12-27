import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients/burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor/burger-constructor";
import { ingredientModalReducer } from "./ingredient-modal/ingredient-modal";
import { orderModalReducer } from "./order-modal/order-modal";
import { userReducer } from "./user/user";
import { feedWSReducer } from "./feedWS/feedWS";
import { ordersWSReducer } from "./ordersWS/ordersWS";
import { feedModalReducer } from "./feed-modal/feed-modal";

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
