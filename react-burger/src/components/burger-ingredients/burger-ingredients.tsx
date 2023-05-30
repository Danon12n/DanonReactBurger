import styles from "./burger-ingredients.module.css";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Category from "./category/category";
import { getIngredientsAction } from "../../services/actions/burger-ingredients";
import { FC } from "react";
import { TStore } from "../../types/types";
import { TBurgerIngredientsState } from "../../services/reducers/burger-ingredients/burger-ingredients";

const BurgerIngredients: FC = () => {
    useEffect(() => {
        getIngredientsAction();
    }, []);

    const [current, setCurrent] = useState("");
    const { ingredients } = useSelector<TStore, TBurgerIngredientsState>(
        (store) => store.burgerIngredients
    );

    const tabsRef = useRef<null | HTMLDivElement>(null);

    const categoryTitles = document.querySelectorAll("#categoryTitle");
    const categoryTitlesArray = Array.from(categoryTitles);
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
            name: "Начинки",
            ingredients: ingredients.filter((item) => item.type === "main"),
        },
        {
            name: "Соусы",
            ingredients: ingredients.filter((item) => item.type === "sauce"),
        },
    ];

    const onScrollHandler = (e: SyntheticEvent) => {
        const distances = categoryTitlesArray.map((elem) => {
            return elem.getBoundingClientRect().y;
        });

        let parent: number;
        if (e.target instanceof Element) {
            parent = e.target.getBoundingClientRect().y;
        } else {
            parent = 0;
        }
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
        <div className={styles.ingredientsWrapper}>
            <p className='text text_type_main-large mt-10'>Соберите бургер</p>
            <div ref={tabsRef} className={styles.TabsWrapper + " mt-5"}>
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

            <div className={styles.list} onScroll={onScrollHandler}>
                {tabNames.map((elem) => {
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
};

export default BurgerIngredients;
