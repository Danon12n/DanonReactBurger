import { FC, useCallback } from "react";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-card.module.css";
import { IngredientsLine } from "./ingredients-line/ingredients-line";
import { TIngredientWithCounter } from "../../../types/types";
import { getIngredientById } from "../../../utils/burger-api";
interface IFeedCardProps {
    orderNumber: string | number;
    orderName: string;
    timeStamp: string;
    order: Array<string>;
    ingredients: TIngredientWithCounter[];
}

const FeedCard: FC<IFeedCardProps> = ({
    orderNumber,
    timeStamp,
    orderName,
    order,
    ingredients,
}) => {
    const calculatePrice = useCallback(
        (ingredients: Array<TIngredientWithCounter | undefined>) => {
            let price = 0;
            let bunWasCalculated = false;
            price = ingredients.reduce((accumulator, el) => {
                if (el) {
                    if (el.type === "bun" && !bunWasCalculated) {
                        bunWasCalculated = true;
                        return accumulator + el.price * 2;
                    }
                    if (el.type !== "bun") return accumulator + el.price;
                }
                return accumulator;
            }, price);
            return price;
        },
        [order]
    );

    //собираем все уникальные ингредиенты в массив
    const getOrderIngredients = (order: string[]) => {
        let result = order.map((ingredientId) => {
            const ingredient = getIngredientById(ingredientId, ingredients);
            if (ingredient) return ingredient;
        });
        return result;
    };
    //фильтрация уникальных ингредиентов по ID
    const filterOrderIngredients = (
        ingredients: Array<TIngredientWithCounter | undefined>
    ) => {
        const result = ingredients.filter(function (item, pos) {
            if (item)
                return (
                    ingredients.findIndex((el) => {
                        if (el) {
                            return el._id === item._id;
                        }
                    }) == pos
                );
        });
        return result;
    };

    const orderIngredients = getOrderIngredients(order);
    const price = calculatePrice(orderIngredients);
    const filteredOrderIngredients = filterOrderIngredients(orderIngredients);

    return (
        <div className={styles.FeedListCard}>
            <div className={`${styles.NumberAndDate} mb-6`}>
                <p className='text text_type_digits-default'>#{orderNumber}</p>
                <FormattedDate
                    className='text text_type_main-default text_color_inactive'
                    date={new Date(timeStamp)}
                />
            </div>
            <p className='text text_type_main-medium mb-6'>{orderName}</p>
            <div className={`${styles.IngredientsAndPrice}`}>
                <IngredientsLine ingredients={filteredOrderIngredients} />
                <div className={styles.Price}>
                    <p className='text text_type_digits-default'>{price}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
};
export { FeedCard };
