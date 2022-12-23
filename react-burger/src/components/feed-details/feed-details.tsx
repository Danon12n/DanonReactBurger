import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFeedAction } from "../../services/actions/feed-modal";
import { TFeedModalState } from "../../services/reducers/feed-modal";
import { TIngredientWithCounter, TStore } from "../../types/types";
import styles from "./feed-details.module.css";
import { IngredientIcon } from "../feeds-list/feed-card/ingredient-icon/ingredient-icon";
import { getIngredientById } from "../../utils/burger-api";
import { TBurgerIngredientsState } from "../../services/reducers/burger-ingredients";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";

const FeedDetails: FC = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();

    useEffect(() => {
        getFeedAction(orderNumber);
        //отключаю линтер потому что эффект должен отпрабатывать только при монтировании
        // eslint-disable-next-line
    }, []);

    const { feed } = useSelector<TStore, TFeedModalState>(
        (store) => store.feedModal
    );

    const { ingredients } = useSelector<TStore, TBurgerIngredientsState>(
        (store) => store.burgerIngredients
    );

    useEffect(() => {
        if (ingredients.length === 0) {
            getIngredientsAction();
        }
        //отключаю линтер потому что эффект должен отпрабатывать только при монтировании
        // eslint-disable-next-line
    }, []);

    const filterFeedIngredients = (ingredientsIds: string[]) => {
        const result: { ingredientId: string; quantity: number }[] = [];
        ingredientsIds.forEach((elem) => {
            let index = result.findIndex((el) => {
                return el.ingredientId === elem;
            });
            if (index === -1) {
                result.push({ ingredientId: elem, quantity: 1 });
            } else {
                result[index].quantity += 1;
            }
        });
        return result;
    };

    const getFeedIngredients = (
        filteredIngredientsWithQuantity: {
            ingredientId: string;
            quantity: number;
        }[]
    ) => {
        const result = filteredIngredientsWithQuantity.map((el) => {
            return getIngredientById(el.ingredientId, ingredients);
        });
        return result;
    };

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
        //если измениться заказ, то и цена должна пересчитаться, хотя напрямую в коллбеке feed и не используется
        // eslint-disable-next-line
        [feed]
    );

    if (!feed) return <p>order Not Found</p>;

    const filteredIngredientsWithQuantity = filterFeedIngredients(
        feed.ingredients
    );
    const feedIngredients = getFeedIngredients(
        filteredIngredientsWithQuantity
    ) as TIngredientWithCounter[];
    const feedPrice = calculatePrice(feedIngredients);
    const feedStatus = feed.status === "done" ? "Выполнен" : "Готовится";

    return (
        feed && (
            <div className={styles.details}>
                <p
                    className={`${styles.title} text text_type_digits-default mb-10`}
                >
                    #{feed.number}
                </p>
                <p className=' text text_type_main-medium mb-2'>{feed.name}</p>
                <p
                    className={`${
                        feed.status === "done" ? styles.Done : ""
                    } text text_type_main-default mb-15`}
                >
                    {feedStatus}
                </p>
                <p className=' text text_type_main-medium mb-4'>Состав:</p>
                <div className={`${styles.IngredientsList} mb-10`}>
                    {filteredIngredientsWithQuantity.map((el, index) => {
                        return (
                            <div
                                className={styles.Ingredient}
                                key={feedIngredients[index]._id}
                            >
                                <IngredientIcon
                                    img={feedIngredients[index].image_mobile}
                                />
                                <p className='text text_type_main-default'>
                                    {feedIngredients[index].name}
                                </p>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default'>
                                        {el.quantity} x{" "}
                                        {feedIngredients[index].price}
                                    </p>
                                    <CurrencyIcon type='primary' />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={`${styles.priceAndDate} mb-5`}>
                    <FormattedDate
                        className='text text_type_main-default text_color_inactive'
                        date={new Date(feed.createdAt)}
                    />
                    <div className={styles.price}>
                        <p className='text text_type_digits-default'>
                            {feedPrice}
                        </p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        )
    );
};
export { FeedDetails };
