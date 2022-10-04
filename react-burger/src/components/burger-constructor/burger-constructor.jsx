import { Component } from 'react'
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './burger-constructor.module.css'

import bulka2 from '../../images/bun-02.jpg'
import bulka1 from '../../images/bun-01.jpg'

export default class BurgerConstructor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    tabNames = ['Булки', 'Соусы', 'Начинки']

    setCurrent = (id) => {
        this.setState({ ...this.state, current: id })
    }

    render() {
        return (
            <div>
                <p className='text text_type_main-large mt-10'>Соберите бургер</p>
                <div className='mt-5' style={{ display: 'flex' }}>
                    {this.tabNames.map((elem, i) => {
                        return (
                            <Tab key={i} value={i} active={this.current === 0} onClick={this.setCurrent}>
                                <p className='text text_type_main-normal'>{elem}</p>
                            </Tab>
                        )
                    })}
                </div>
                <p className='text text_type_main-medium mt-10'>Булки</p>
                /* todo:
                1) то что выше обьединить в один компонент
                2) можно использовать функциональные компоненты
                3) то что ниже тоже выделить в компонент
                4) написать стили к этому компоненту
                5) достать картинки для этого компонента
                */
                <div className="list">
                    <div className="list-item">
                        <Counter />
                        <div>
                            <img src={bulka1} />
                        </div>
                        <div style={{ display: 'flex' }} className="price">
                            <p className='text text_type_digits-default'>20</p>
                            <CurrencyIcon />
                        </div>
                        <p className='text text_type_main-default'>Краторная булка N-200i</p>

                    </div>
                </div>
            </div>
        )
    }
}
