import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div className={AppStyles.App}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <div className={AppStyles.wrapper}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </DndProvider>
        </div>
    );
}

export default App;

// {ingredientsFailed ? (
//     <p>ERROR</p>
// ) : ingredientsRequest ? (
//     <h1 className='text text_type_main-large'>Идет загрузка...</h1>
// ) : (
//     <div className={AppStyles.wrapper}>
//         <BurgerIngredients />
//         <BurgerConstructor />
//     </div>
// )}
