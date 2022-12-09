import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-card.module.css";
import { useSelector } from "react-redux";
import {
    TIngredientWithCounter,
    TStore,
    TStoreBurgerIngredients,
} from "../../../types/types";
import { IngredientIcon } from "./ingredient-icon/ingredient-icon";
interface IFeedCardProps {}

const FeedCard: FC<IFeedCardProps> = ({}) => {
    const { ingredients } = useSelector<TStore, TStoreBurgerIngredients>(
        (store) => store.burgerIngredients
    );
    return (
        <div className={styles.FeedListCard}>
            <div className={`${styles.NumberAndDate} mb-6`}>
                <p className='text text_type_digits-default'>#034535</p>
                <p className='text text_type_main-default text_color_inactive'>
                    Сегодня, 16:20
                </p>
            </div>
            <p className='text text_type_main-default mb-6'>
                Death Star Starship Main бургер
            </p>
            <div className={`${styles.IngredientsAndPrice}`}>
                <div className={styles.Ingredients}>
                    {ingredients.map((el: TIngredientWithCounter) => {
                        return (
                            <IngredientIcon
                                key={el._id}
                                img={el.image_mobile}
                            />
                        );
                    })}
                </div>
                <div className={styles.Price}>
                    <p className='text text_type_digits-default'>123123</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
};
export { FeedCard };
