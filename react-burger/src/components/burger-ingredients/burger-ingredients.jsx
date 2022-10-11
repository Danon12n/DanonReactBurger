import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { useState } from "react";

import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Category from "./category/category";

export default function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = useState("");

    const tabNames = [
        {
            name: "Булки",
            ingredients: ingredients.filter((item) => item.type === "bun"),
        },
        {
            name: "Соусы",
            ingredients: ingredients.filter((item) => item.type === "main"),
        },
        {
            name: "Начинки",
            ingredients: ingredients.filter((item) => item.type === "sauce"),
        },
    ];

    return (
        <div>
            <p className='text text_type_main-large mt-10'>Соберите бургер</p>
            <div className={BurgerIngredientsStyles.TabsWrapper + " mt-5"}>
                {tabNames.map((elem) => {
                    return (
                        <Tab
                            key={elem.name}
                            value={elem.name}
                            active={current === elem.name}
                            onClick={setCurrent}
                        >
                            <p className='text text_type_main-small'>
                                {elem.name}
                            </p>
                        </Tab>
                    );
                })}
            </div>

            <div className={BurgerIngredientsStyles.list}>
                {tabNames.map((elem, i) => {
                    return (
                        <Category
                            key={elem.name}
                            ingredients={elem.ingredients}
                            name={elem.name}
                        />
                    );
                })}
            </div>
        </div>
    );
}

BurgerIngredients.defaultProps = {
    ingredients: [],
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
};
