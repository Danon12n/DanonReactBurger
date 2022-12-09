import { FC } from "react";
import { FeedCard } from "./feed-card/feed-card";
import styles from "./feeds-list.module.css";
interface IFeedsListProps {}

const FeedsList: FC<IFeedsListProps> = ({}) => {
    return (
        <div className={styles.FeedsList}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
        </div>
    );
};
export { FeedsList };
