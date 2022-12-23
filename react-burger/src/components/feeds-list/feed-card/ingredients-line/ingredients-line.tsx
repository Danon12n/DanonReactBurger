import { FC } from "react";
import { TIngredientWithCounter } from "../../../../types/types";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import styles from "./ingredients-line.module.css";

interface IngredientsLineProps {
    ingredients: Array<TIngredientWithCounter | undefined>;
}

//TODO ингредиенты иконки тут выводить
//ингредиенты надо указывать уникальные без повторений

const IngredientsLine: FC<IngredientsLineProps> = ({ ingredients }) => {
    return (
        <div className={styles.Ingredients}>
            {ingredients.map((el, index) => {
                if (el) {
                    if (index < 4)
                        return (
                            <IngredientIcon
                                key={el._id}
                                img={el.image_mobile}
                            />
                        );
                    if (index === 4) {
                        return (
                            <IngredientIcon
                                key={el._id}
                                img={el.image_mobile}
                                others={ingredients.length - index}
                            />
                        );
                    }
                }
            })}
        </div>
    );
};
export { IngredientsLine };
