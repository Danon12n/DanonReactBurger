import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/burger-api";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
            .then(setIngredients)
            .catch(() => alert("Возникла ошибка при загрузке"))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <div className={AppStyles.App}>
            <AppHeader />
            {isLoading ? (
                <h1 className='text text_type_main-large'>Идет загрузка...</h1>
            ) : (
                <div className={AppStyles.wrapper}>
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructor ingredients={ingredients} />
                </div>
            )}
        </div>
    );
}

export default App;
