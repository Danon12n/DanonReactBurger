import BurgerIngredientsStyles from "./burger-ingredients.module.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Category from "./category/category";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";

export default function BurgerIngredients() {
    useEffect(() => {
        getIngredientsAction();
    }, []);

    const [current, setCurrent] = useState("");
    const ingredients = useSelector(
        (store) => store.burgerIngredients.ingredients
    );

    const tabsRef = useRef();

    const categoryTitles = document.getElementsByName("categoryTitle");
    const categoryTitlesArray = [];
    for (
        var i = categoryTitles.length;
        i--;
        categoryTitlesArray.unshift(categoryTitles[i])
    );
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

    const onScrollHandler = (e) => {
        const distances = categoryTitlesArray.map((elem) => {
            return elem.getBoundingClientRect().y;
        });

        const parent = e.target.getBoundingClientRect().y;
        const differences = distances.map((el) => {
            let new_el = el - parent;
            if (new_el < 0) return -new_el;
            return new_el;
        });
        const min = Math.min.apply(null, differences);
        const index = differences.indexOf(min);
        setCurrent(tabNames[index].name);
    };

    return (
        <div>
            <p className='text text_type_main-large mt-10'>Соберите бургер</p>
            <div
                ref={tabsRef}
                className={BurgerIngredientsStyles.TabsWrapper + " mt-5"}
            >
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

            <div
                className={BurgerIngredientsStyles.list}
                onScroll={onScrollHandler}
            >
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
