import { Component } from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './burger-ingredients.module.css'

import data from '../../utils/data'

const test_data = [data[1], data[1], data[2], data[3], data[2], data[3], data[2], data[3], data[2], data[3],
data[2], data[3], data[2], data[3], data[2], data[3], data[2], data[3], data[2], data[3], data[2], data[3],];

export default class BurgerIngredients extends Component {


    render() {
        return (
            <div className=' mt-25 pl-4 pr-4'>
                <ConstructorElement
                    extraClass='ml-8 mb-4'
                    text={`${data[0].name} (вверх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                    type='top'
                    isLocked={true} />
                <div className={BurgerIngredientsStyles.container}>

                    {test_data.map((elem, i) => {
                        return (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', }}>
                                <DragIcon />
                                <ConstructorElement
                                    extraClass='ml-2 mb-4'
                                    text={elem.name}
                                    price={elem.price}
                                    thumbnail={elem.image}
                                />
                            </div>
                        )
                    })}
                </div>

                <ConstructorElement
                    extraClass='ml-8 mt-4'
                    text={`${data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                    type='bottom'
                    isLocked={true} />
                <div className={BurgerIngredientsStyles.buttonWrapper + ' mt-10'}>
                    <p className='text text_type_digits-medium  mr-3'>123</p>
                    <CurrencyIcon />
                    <Button htmlType='submit' extraClass='ml-10' size='large'>Оформить заказ</Button>
                </div>
            </div >
        )
    }
}