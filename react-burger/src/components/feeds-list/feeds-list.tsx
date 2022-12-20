import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { TBurgerIngredientsState } from "../../services/reducers/burger-ingredients";
import { IFeedMessage, TStore } from "../../types/types";
import { FeedCard } from "./feed-card/feed-card";
import styles from "./feeds-list.module.css";
interface IFeedsListProps {
    feed: IFeedMessage;
}

const FeedsList: FC<IFeedsListProps> = ({ feed }) => {
    const { ingredients } = useSelector<TStore, TBurgerIngredientsState>(
        (store) => store.burgerIngredients
    );

    useEffect(() => {
        if (ingredients.length === 0) {
            getIngredientsAction();
        }
    }, []);

    return (
        <div className={styles.FeedsList}>
            {feed.orders.map((order) => {
                return (
                    <FeedCard
                        key={order._id}
                        orderName={order.name}
                        orderNumber={order.number}
                        timeStamp={order.createdAt}
                        order={order.ingredients}
                        ingredients={ingredients}
                    />
                );
            })}
        </div>
    );
};
export { FeedsList };
