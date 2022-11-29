import styles from "./category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { FC } from "react";
import { TIngredientWithCounter } from "../../../types/types";
import { Link, useLocation } from "react-router-dom";

interface IConstructorCategoryProps {
    name: string;
    ingredients: Array<TIngredientWithCounter>;
}

const ConstructorCategory: FC<IConstructorCategoryProps> = ({
    name,
    ingredients,
}) => {
    let location = useLocation();

    return (
        <>
            <p
                id='categoryTitle'
                className={
                    styles.categoryTitle +
                    " text text_type_main-medium  mb-6 mt-10"
                }
            >
                {name}
            </p>
            <div className={styles.list}>
                {ingredients.map((elem) => {
                    return (
                        <Link
                            className={`${styles.link} text text_type_main-medium`}
                            key={elem._id}
                            to={{
                                pathname: `/ingredients/${elem._id}`,
                                state: { background: location },
                            }}
                        >
                            <IngredientCard key={elem._id} ingredient={elem} />
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default ConstructorCategory;
