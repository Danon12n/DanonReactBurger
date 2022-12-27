// socketMiddleware
import { TBurgerConstructorState } from "../services/reducers/burger-constructor/burger-constructor";
import { TBurgerIngredientsState } from "../services/reducers/burger-ingredients/burger-ingredients";
import { TFeedModalState } from "../services/reducers/feed-modal/feed-modal";
import { TFeedWSState } from "../services/reducers/feedWS/feedWS";
import { TIngredientModalState } from "../services/reducers/ingredient-modal/ingredient-modal";
import { TOrderModalState } from "../services/reducers/order-modal/order-modal";
import { TOrdersWSState } from "../services/reducers/ordersWS/ordersWS";
import { TUserState } from "../services/reducers/user/user";
import { store } from "../services/store";
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type TFeedOrder = {
    success: boolean;
    ingredients: Array<string>;
    _id: string;
    status: "created" | "pending" | "done";
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    owner?: string;
};

export interface IFeedMessage {
    success: boolean;
    orders: Array<TFeedOrder>;
    total: number;
    totalToday: number;
}
// socketMiddleware

export type TUser = {
    email: string;
    name: string;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TIngredientWithCounter = TIngredient & {
    counter: number;
    ingredientKey: string;
};

export type TStore = {
    feedModal: TFeedModalState;
    orders: TOrdersWSState;
    feeds: TFeedWSState;
    user: TUserState;
    orderModal: TOrderModalState;
    ingredientModal: TIngredientModalState;
    burgerIngredients: TBurgerIngredientsState;
    burgerConstructor: TBurgerConstructorState;
};

//API types

export type TServerAnswer = {
    success: boolean;
    message?: string;
    user?: TUser;
    accessToken?: string;
    refreshToken?: string;
    data?: Array<TIngredientWithCounter>;
    order?: {
        number: number;
    };
    orders?: Array<TFeedOrder>;
};

export type TResetPasswordBody = {
    password: string;
    token: string;
};

export type TLogoutUserBody = {
    token: string;
};
export type TUpdateTokenBody = TLogoutUserBody;

export type TUserInfo = {
    email: string | undefined;
    name: string | undefined;
    password?: string;
};

export type TUpdateUserInfoBody = TUserInfo;

export type TRegisterUserBody = {
    email: string;
    name: string;
    password: string;
};

export type TAuthUserBody = {
    email: string;
    password: string;
};

//API types

//Test Types

//Test Types
