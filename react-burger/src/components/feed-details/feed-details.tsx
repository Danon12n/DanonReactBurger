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
interface FeedDetailsProps {}

const FeedDetails: FC<FeedDetailsProps> = ({}) => {
    const { orderNumber } = useParams<{ orderNumber: string }>();

    useEffect(() => {
        getFeedAction(orderNumber);
    }, []);

    const { feed } = useSelector<TStore, TFeedModalState>(
        (store) => store.feedModal
    );

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
        [feed]
    );

    if (!feed) return <p>order Not Found</p>;

    const feedStatus = feed.status === "done" ? "Выполнено" : "Готовится";

    return (
        feed && (
            <div className={styles.details}>
                <p className='text text_type_digits-default mb-10'>
                    #{feed.number}
                </p>
                <p className=' text text_type_main-medium mb-2'>{feed.name}</p>
                <p className='text text_type_main-default mb-15'>
                    {feedStatus}
                </p>
                <p className=' text text_type_main-medium mb-4'>Состав:</p>
                <div className={`${styles.IngredientsList} mb-10`}>
                    <div className={styles.Ingredient}>ingreient</div>
                </div>
                <div className={styles.priceAndDate}>
                    <FormattedDate
                        className='text text_type_main-default text_color_inactive'
                        date={new Date(feed.createdAt)}
                    />
                    <div className={styles.price}>
                        <p className='text text_type_digits-default'>510</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        )
    );
};
export { FeedDetails };
