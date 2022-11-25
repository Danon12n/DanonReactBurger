import CategoryStyles from "./category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { FC } from "react";
import {  TIngredientWithCounter } from "../../../types/types";

interface IConstructorCategoryProps {
    name: string;
    ingredients: Array<TIngredientWithCounter>;
}

const ConstructorCategory: FC<IConstructorCategoryProps> = ({
    name,
    ingredients,
}) => {
    return (
        <>
            <p
                id='categoryTitle'
                className={
                    CategoryStyles.categoryTitle +
                    " text text_type_main-medium  mb-6 mt-10"
                }
            >
                {name}
            </p>
            <div className={CategoryStyles.list}>
                {ingredients.map((elem) => {
                    return <IngredientCard key={elem._id} ingredient={elem} />;
                })}
            </div>
        </>
    );
};

export default ConstructorCategory;
