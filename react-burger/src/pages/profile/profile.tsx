import styles from "./profile.module.css";
import { FC, useEffect } from "react";
import SideNavigation from "../../components/side-navigation/side-navigation";
import { useLocation } from "react-router-dom";
import { UserProfile } from "../../components/user-profile/user-profile";
import { FeedsList } from "../../components/feeds-list/feeds-list";
import { boundOrdersWS } from "../../services/actions/ordersWS";
import { getCookie } from "../../utils/cookie";
import { useSelector } from "react-redux";
import { TStore } from "../../types/types";
import { TOrdersWSState } from "../../services/reducers/ordersWS/ordersWS";

const ProfilePage: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const accessToken = getCookie("token");

        boundOrdersWS.wsStart(
            `wss://norma.nomoreparties.space/orders?token=${accessToken?.slice(
                7
            )}`
        );

        return () => {
            boundOrdersWS.wsClosed();
        };
    }, []);

    const { feed } = useSelector<TStore, TOrdersWSState>(
        (store) => store.orders
    );

    if (!feed) return <>no feeds</>;

    return (
        <div className={styles.wrapper}>
            <SideNavigation />
            {pathname === "/profile" && <UserProfile />}
            {pathname === "/profile/orders" && (
                <FeedsList path={pathname} feed={feed} />
            )}
        </div>
    );
};
export { ProfilePage };
