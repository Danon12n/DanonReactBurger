import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { TBurgerIngredientsState } from "../../services/reducers/burger-ingredients";
import { IFeedMessage, TStore } from "../../types/types";
import { FeedCard } from "./feed-card/feed-card";
import styles from "./feeds-list.module.css";
import { Link, useLocation } from "react-router-dom";
interface IFeedsListProps {
    feed: IFeedMessage;
}

const FeedsList: FC<IFeedsListProps> = ({ feed }) => {
    const { ingredients } = useSelector<TStore, TBurgerIngredientsState>(
        (store) => store.burgerIngredients
    );

    let location = useLocation();

    useEffect(() => {
        if (ingredients.length === 0) {
            getIngredientsAction();
        }
    }, []);

    return (
        <div className={styles.FeedsList}>
            {feed.orders.map((order) => {
                return (
                    <Link
                        className={`${styles.link} text text_type_main-medium`}
                        key={order._id}
                        to={{
                            pathname: `/feed/${order.number}`,
                            state: { background: location },
                        }}
                    >
                        <FeedCard
                            key={order._id}
                            orderName={order.name}
                            orderNumber={order.number}
                            timeStamp={order.createdAt}
                            order={order.ingredients}
                            ingredients={ingredients}
                        />
                    </Link>
                );
            })}
        </div>
    );
};
export { FeedsList };
