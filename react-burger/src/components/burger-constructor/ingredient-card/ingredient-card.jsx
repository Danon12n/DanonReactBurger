
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCardStyles from './ingredient-card.module.css'

export default function IngredientCard({ name, price, image }) {
    return (
        <div className={IngredientCardStyles.card + " p-4"} >
            <Counter />
            <img src={image} />
            <div style={{ display: 'flex' }} className="mt-1 mb-1">
                <p className='text text_type_digits-default mr-3'>{price}</p>
                <CurrencyIcon />
            </div>
            <p className='text text_type_main-default'>{name}</p>
        </div>
    )
}
