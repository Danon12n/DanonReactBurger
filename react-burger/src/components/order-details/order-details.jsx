import styles from "./order-details.module.css";
import DoneIcon from "../../images/done.svg";

const OrderDetails = function () {
    return (
        <div className={styles.details}>
            <p
                className={
                    styles.orderNumber + " text text_type_digits-large mb-8"
                }
            >
                034536
            </p>
            <p className={styles.label + " text text_type_main-medium mb-15"}>
                идентификатор заказа
            </p>
            <img className='mb-15' src={DoneIcon} alt='Done' />
            <p className={styles.label + " text text_type_main-default mb-2"}>
                Ваш заказ начали готовить
            </p>
            <p
                className={
                    styles.label +
                    " text text_type_main-default text_color_inactive mb-30"
                }
            >
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};
export { OrderDetails };
