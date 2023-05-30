import { FC } from "react";
import { useSelector } from "react-redux";
import { TFeedWSState } from "../../services/reducers/feedWS/feedWS";
import { TStore } from "../../types/types";
import styles from "./order-status-board.module.css";

const OrderStatusBoard: FC = () => {
    const { feed } = useSelector<TStore, TFeedWSState>((store) => store.feeds);

    if (!feed) return <>no feeds</>;

    const feedsDone: Array<number> = [];
    const feedsCooking: Array<number> = [];

    feed.orders.forEach((el) => {
        if (el.status === "done") feedsDone.push(el.number);
        else feedsCooking.push(el.number);
    });
    const columns = [0, 1, 2];
    const feedTotal = `${Math.floor(feed.total / 1000)} ${feed.total % 1000}`;
    return (
        <div>
            <div className={`${styles.columns} mb-15`}>
                <div className={styles.column}>
                    <div className={styles.columnTitle}>
                        <p className='text text_type_main-medium pb-6'>
                            Готовы:
                        </p>
                    </div>
                    <div className={styles.columnNumbers}>
                        {columns.map((el) => {
                            return (
                                <div className={styles.column}>
                                    {feedsDone
                                        .slice(el * 5, (el + 1) * 5)
                                        .map((el) => {
                                            return (
                                                <p
                                                    className={`${styles.Ready} text text_type_digits-default mb-2`}
                                                >
                                                    {el}
                                                </p>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.column}>
                    <p className='text text_type_main-medium pb-6'>В работе:</p>
                    {feedsCooking.slice(0, 5).map((el, index) => {
                        return (
                            <p className={`text text_type_digits-default mb-2`}>
                                {el}
                            </p>
                        );
                    })}
                </div>
            </div>
            <p className='text text_type_main-medium'>
                Выполнено за все время:
            </p>
            <p className='text text_type_digits-large mb-15'>{feedTotal}</p>
            <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
            <p className='text text_type_digits-large'>{feed.totalToday}</p>
        </div>
    );
};
export { OrderStatusBoard };
