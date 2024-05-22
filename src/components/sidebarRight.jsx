import React from 'react'
import './sidebar.css'
import { slide as Menu } from 'react-burger-menu'
import logo from '../images/logo2.png'

const SideBarRight = props => {
    return (
        <Menu {...props} id='appId'>
            <a className='menu-item' href="/#">
                <img src={logo} alt='' width={90}/>
            </a>
            <a className='menu-item' href='/'>
                Contact
            </a>

            <a className='menu-item' href='/'>
                Coming Soon
            </a>

            <a className='menu-item' href='/'>
                Age Check
            </a>
        </Menu>
    )
}

export default SideBarRight
