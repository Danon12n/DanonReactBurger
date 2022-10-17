import styles from "./ingredient-details.module.css";
import PropsTypes from "prop-types";

const IngredientDetails = function ({ ingredient }) {
    const components = [
        { name: "Калории,ккал", value: ingredient.calories },
        { name: "Белки, г", value: ingredient.proteins },
        { name: "Жиры, г", value: ingredient.fat },
        { name: "Углеводы, г", value: ingredient.carbohydrates },
    ];
    return (
        <div className={styles.details}>
            <img
                className='mb-4'
                src={ingredient.image_large}
                alt={"ингредиент"}
            ></img>
            <p
                className={
                    styles.ingredientName + " text text_type_main-medium mb-8"
                }
            >
                {ingredient.name}
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

IngredientDetails.propTypes = {
    ingredient: PropsTypes.object.isRequired,
};
