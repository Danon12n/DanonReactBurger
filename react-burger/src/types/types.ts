export type TLocationState = {
    background: Location;
};


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
};

export type TConstructorIngredient = TIngredientWithCounter & {
    ingredientKey: string;
};

export type TStoreUser = {
    isAuthed: boolean;
    isCodeSent: boolean;
    user: TUser;
};
export type TStoreOrderModal = {
    orderNumber: number;
};
export type TStoreIngredientModal = {
    currentIngredient: TIngredientWithCounter;
};
export type TStoreBurgerIngredients = {
    ingredients: Array<TIngredientWithCounter>;
    ingredientsRequest: boolean;
};
export type TStoreBurgerConstructor = {
    fillings: Array<TConstructorIngredient>;
    bun: TIngredientWithCounter;
};

export type TStore = {
    users: TStoreUser;
    orderModal: TStoreOrderModal;
    ingredientModal: TStoreIngredientModal;
    burgerIngredients: TStoreBurgerIngredients;
    burgerConstructor: TStoreBurgerConstructor;
};

//API types

export type TServerAnswer = {
    success: boolean;
    message?: string;
    user?: TUser;
    accessToken?: string;
    refreshToken?: string;
    data?: Array<TIngredient>;
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
    email: string;
    name: string;
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
