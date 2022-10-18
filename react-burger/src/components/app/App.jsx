import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useEffect, useState, useReducer } from "react";
import { getIngredients } from "../../utils/burger-api";
import { BurgerConstructorContext } from "../../utils/burger-constructor-context";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);

    const BurgerConstructorInitialState = {
        ingredients: [],
        orderNumber: -1,
    };

    function reducer(state, action) {
        switch (action.type) {
            case "setIngredients":
                return { ...state, ingredients: action.payload };
            case "setOrderNumber":
                return { ...state, orderNumber: action.payload };
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

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
        dispatch({ type: "setIngredients", payload: ingredients });
    }, [isLoading, ingredients]);

    return (
        <BurgerConstructorContext.Provider value={{ state, dispatch }}>
            <div className={AppStyles.App}>
                <AppHeader />
                {isLoading ? (
                    <h1 className='text text_type_main-large'>
                        Идет загрузка...
                    </h1>
                ) : (
                    <div className={AppStyles.wrapper}>
                        <BurgerIngredients ingredients={ingredients} />
                        <BurgerConstructor />
                    </div>
                )}
            </div>
        </BurgerConstructorContext.Provider>
    );
}

export default App;
