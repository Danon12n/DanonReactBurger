import { Component } from 'react'

import BurgerConstructorStyles from './burger-constructor.module.css'

import data from '../../utils/data'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Category from './category/category'


export default class BurgerConstructor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    tabNames = [
        { name: 'Булки', type: 'bun' },
        { name: 'Соусы', type: 'sauce' },
        { name: 'Начинки', type: 'main' }
    ]

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
                                <p className='text text_type_main-small'>{elem.name}</p>
                            </Tab>
                        )
                    })}
                </div>

                <div className={BurgerConstructorStyles.list}>
                    {this.tabNames.map((elem, i) => {
                        let type = elem.type;
                        return (<Category
                            key={i}
                            ingredients={data.filter(elem => elem.type === type)}
                            name={elem.name}
                        />)
                    })}
                </div>
            </div >
        )
    }
}

