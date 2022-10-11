import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import data from "../../utils/data";

function App() {
    return (
        <div className={AppStyles.App}>
            <AppHeader />
            <div className={AppStyles.wrapper}>
                <BurgerIngredients ingredients={[...data]} />
                <BurgerConstructor ingredients={[...data]} />
            </div>
        </div>
    );
}

export default App;
