import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useEffect, useState, useReducer } from "react";
import { getIngredients } from "../../utils/burger-api";
import {
    BurgerConstructorContext,
    reducer,
    BurgerConstructorInitialState,
    SET_INGREDIENTS,
} from "../../utils/burger-constructor-context";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);

    const [state, dispatch] = useReducer(
        reducer,
        BurgerConstructorInitialState
    );

    useEffect(() => {
        getIngredients()
            .then(setIngredients)
            .catch(() => alert("Возникла ошибка при загрузке"))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (ingredients) {
            dispatch({ type: SET_INGREDIENTS, payload: ingredients });
        }
    }, [isLoading, ingredients]);

    return (
        <div className={AppStyles.App}>
            <AppHeader />
            {isLoading ? (
                <h1 className='text text_type_main-large'>Идет загрузка...</h1>
            ) : (
                <div className={AppStyles.wrapper}>
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructorContext.Provider
                        value={{ state, dispatch }}
                    >
                        <BurgerConstructor />
                    </BurgerConstructorContext.Provider>
                </div>
            )}
        </div>
    );
}

export default App;
