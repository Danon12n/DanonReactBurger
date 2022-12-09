import styles from "./profile.module.css";
import { FC } from "react";
import SideNavigation from "../../components/side-navigation/side-navigation";
import { useLocation } from "react-router-dom";
import OrdersHistory from "../../components/orders-history/orders-history";
import { UserProfile } from "../../components/user-profile/user-profile";

const ProfilePage: FC = () => {
    const { pathname } = useLocation();

    return (
        <div className={styles.wrapper}>
            <SideNavigation />
            {pathname === "/profile" && <UserProfile />}
            {pathname === "/profile/orders" && <OrdersHistory />}
        </div>
    );
};
export { ProfilePage };
