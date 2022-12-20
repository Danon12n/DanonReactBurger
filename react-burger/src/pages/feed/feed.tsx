import { FC } from "react";
import { FeedDetails } from "../../components/feed-details/feed-details";
import styles from "./feed.module.css";
interface FeedPageProps {}

const FeedPage: FC<FeedPageProps> = ({}) => {
    return (
        <div className={styles.wrapper}>
            <FeedDetails />
        </div>
    );
};
export { FeedPage };
