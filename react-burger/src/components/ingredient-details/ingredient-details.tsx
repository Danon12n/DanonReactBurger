import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { FC } from "react";
import { TStore, TStoreIngredientModal } from "../../types/types";

const IngredientDetails: FC = function () {
    const { currentIngredient } = useSelector<TStore, TStoreIngredientModal>(
        (store) => store.ingredientModal
    );

    if (currentIngredient === null) return null;
    const components = [
        { name: "Калории,ккал", value: currentIngredient.calories },
        { name: "Белки, г", value: currentIngredient.proteins },
        { name: "Жиры, г", value: currentIngredient.fat },
        { name: "Углеводы, г", value: currentIngredient.carbohydrates },
    ];

    return (
        <div className={styles.details}>
            <img
                className='mb-4'
                src={currentIngredient.image_large}
                alt={"ингредиент"}
            ></img>
            <p
                className={
                    styles.ingredientName + " text text_type_main-medium mb-8"
                }
            >
                {currentIngredient.name}
            </p>
            <div className={styles.compound}>
                {components.map((component) => {
                    return (
                        <div
                            key={component.name}
                            className={styles.compoundItem + " mb-15"}
                        >
                            <p className='text text_type_main-default text_color_inactive'>
                                {component.name}
                            </p>
                            <p className='text text_type_digits-default text_color_inactive'>
                                {component.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export { IngredientDetails };
