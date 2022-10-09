import { Component } from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderStyles from './app-header.module.css'

import NavItem from './nav-item/nav-item'


export default class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeId: 1,
        }
    }

    toggleNavItem = (id) => {
        console.log(id)
        if (id !== this.state.activeId) {
            this.setState({ ...this.state, activeId: id });
        }

    }

    NavItems = [
        { icon: <BurgerIcon type='secondary' />, text: 'Конструкторная', },
        { icon: <ListIcon type='secondary' />, text: 'Лента заказов' },

    ]

    render() {
        return (
            <header className={AppHeaderStyles.header}>
                <nav className={AppHeaderStyles.navigation}>
                    {this.NavItems.map((elem, i) => {
                        return (
                            <NavItem key={i} props={
                                {
                                    id: i,
                                    icon: elem.icon,
                                    text: elem.text,
                                    isActive: this.state.activeId === i ? true : false,
                                    onClickFn: this.toggleNavItem
                                }} />
                        )
                    })}
                </nav>
                <div className={AppHeaderStyles.logo}>
                    <Logo />
                </div>
                <NavItem props={{
                    id: (this.NavItems.length),
                    icon: <ProfileIcon type='secondary' />,
                    text: 'Личный кабинет',
                    isActive: (this.NavItems.length === this.state.activeId) ? true : false,
                    onClickFn: this.toggleNavItem
                }}>

                </NavItem>
            </header>
        )
    }
}

