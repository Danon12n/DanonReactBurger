import NavItemStyles from './nav-item.module.css'

export default function NavItem({ props }) {
    return (
        <div className={NavItemStyles.navItem + " pl-4 pr-4"}>
            {props.icon}
            <p className='text text_type_main-small ml-2' onClick={(id) => { props.onClickFn(props.id) }}>{props.text}</p>
        </div>
    )
}
