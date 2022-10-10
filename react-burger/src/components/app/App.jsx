import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
    return (
        <div className={AppStyles.App}>
            <AppHeader />
            <div className={AppStyles.wrapper}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </div>
    );
}

export default App;
