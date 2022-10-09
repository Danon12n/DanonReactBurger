import CategoryStyles from './category.module.css'
import IngredientCard from '../ingredient-card/ingredient-card'

export default function ConstructorCategory({ name, ingredients }) {
    return (
        <>
            <p className={CategoryStyles.categoryTitle + ' text text_type_main-medium  mb-6 mt-10'}>{name}</p>
            <div className={CategoryStyles.list}>
                {ingredients.map((elem, i) => {
                    return <IngredientCard key={i} {...elem} />
                })}
            </div>
        </>
    )
}
