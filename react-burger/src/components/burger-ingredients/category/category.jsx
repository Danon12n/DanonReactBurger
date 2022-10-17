import CategoryStyles from "./category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";

export default function ConstructorCategory({ name, ingredients }) {
    return (
        <>
            <p
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
}

ConstructorCategory.defaultProps = {
    name: "Название Категории",
    ingredients: [],
};

ConstructorCategory.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object),
};
