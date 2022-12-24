import type { TIngredientWithCounter } from "../types/types";

export const generateTestIngedient = (
    _id: string = "string",
    name: string = "string",
    type: string = "string",
    proteins: number = 0,
    fat: number = 0,
    carbohydrates: number = 0,
    calories: number = 0,
    price: number = 0,
    image: string = "string",
    image_mobile: string = "string",
    image_large: string = "string",
    __v: number = 0,
    counter: number = 0,
    ingredientKey: string = "string"
) => {
    const result: TIngredientWithCounter = {
        _id,
        name,
        type,
        proteins,
        fat,
        carbohydrates,
        calories,
        price,
        image,
        image_mobile,
        image_large,
        __v,
        counter,
        ingredientKey,
    };
    return result;
};
