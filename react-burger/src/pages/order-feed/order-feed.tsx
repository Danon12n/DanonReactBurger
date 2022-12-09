import { FC } from "react";
import { FeedsList } from "../../components/feeds-list/feeds-list";
import { OrderStatusBoard } from "../../components/order-status-board/order-status-board";
import styles from "./order-feed.module.css";

interface IOrderFeedPageProps {}

const OrderFeedPage: FC<IOrderFeedPageProps> = ({}) => {
    return (
        <div className={styles.Wrapper}>
            <h1
                className={`${styles.Title} text text_type_main-medium  mb-5 mt-10`}
            >
                Лента заказов
            </h1>
            <div className={styles.ContentWrapper}>
                <FeedsList/>
                <OrderStatusBoard/>
            </div>
        </div>
    );
};
export { OrderFeedPage };
