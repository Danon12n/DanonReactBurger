import { Component } from "react";

import BurgerIngredientsStyles from "./burger-ingredients.module.css";

import data from "../../utils/data";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Category from "./category/category";

const buns = data.filter((item) => item.type === "bun");
const mains = data.filter((item) => item.type === "main");
const sauces = data.filter((item) => item.type === "sauce");

export default class BurgerIngredients extends Component {
    state = {
        current: 0,
    };

    tabNames = [
        { name: "Булки", type: "bun", ingredients: buns },
        { name: "Соусы", type: "sauce", ingredients: mains },
        { name: "Начинки", type: "main", ingredients: sauces },
    ];

    setCurrent = (id) => {
        this.setState({ ...this.state, current: id });
    };

    render() {
        return (
            <div>
                <p className='text text_type_main-large mt-10'>
                    Соберите бургер
                </p>
                <div className={BurgerIngredientsStyles.TabsWrapper + " mt-5"}>
                    {this.tabNames.map((elem, i) => {
                        return (
                            <Tab
                                key={i}
                                value={i}
                                active={this.current === 0}
                                onClick={this.setCurrent}
                            >
                                <p className='text text_type_main-small'>
                                    {elem.name}
                                </p>
                            </Tab>
                        );
                    })}
                </div>

                <div className={BurgerIngredientsStyles.list}>
                    {this.tabNames.map((elem, i) => {
                        return (
                            <Category
                                key={i}
                                ingredients={elem.ingredients}
                                name={elem.name}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
