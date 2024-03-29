import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { FeedsList } from "../../components/feeds-list/feeds-list";
import { OrderStatusBoard } from "../../components/order-status-board/order-status-board";
import { boundFeedWS } from "../../services/actions/feedWS";
import { TFeedWSState } from "../../services/reducers/feedWS/feedWS";
import { TStore } from "../../types/types";
import styles from "./feeds.module.css";

const FeedsPage: FC = () => {
    useEffect(() => {
        boundFeedWS.wsStart("wss://norma.nomoreparties.space/orders/all");

        return () => {
            boundFeedWS.wsClosed();
        };
    }, []);

    const { feed } = useSelector<TStore, TFeedWSState>((store) => store.feeds);

    return (
        feed && (
            <div className={styles.Wrapper}>
                <div className={styles.ContentWrapper}>
                    <h1
                        className={`${styles.Title} text text_type_main-medium  mb-5 mt-10`}
                    >
                        Лента заказов
                    </h1>
                    <div className={styles.FeedsWrapper}>
                        <FeedsList path='feed' feed={feed} />
                        <OrderStatusBoard />
                    </div>
                </div>
            </div>
        )
    );
};
export { FeedsPage };
