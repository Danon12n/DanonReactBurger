import styles from "./constructor.module.css";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ConstructorPage = function () {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </DndProvider>
    );
};
export { ConstructorPage };
