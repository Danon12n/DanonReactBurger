import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getIngredientsAction,
    SET_CONSTRUCTOR_INGREDIENTS,
} from "../../services/actions";

function App() {
    const dispatch = useDispatch();

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
        (store) => store.main
    );

    useEffect(() => {
        dispatch(getIngredientsAction());
        dispatch({
            type: SET_CONSTRUCTOR_INGREDIENTS,
            ingredients: ingredients,
        });
    }, []);
    //TODO: когда можно будет добавлять элементы в burgerConstructor через DnD
    //      перенести этот эффект в burgerIngredients и удалить dispatch

    return (
        <div className={AppStyles.App}>
            <AppHeader />
            {ingredientsFailed ? (
                <p>ERROR</p>
            ) : ingredientsRequest ? (
                <h1 className='text text_type_main-large'>Идет загрузка...</h1>
            ) : (
                <div className={AppStyles.wrapper}>
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructor />
                </div>
            )}
        </div>
    );
}

export default App;
