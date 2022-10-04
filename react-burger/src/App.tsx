import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="wrapper">
        <BurgerConstructor />
        <BurgerIngredients />
      </div>
    </div>
  );
}

export default App;
