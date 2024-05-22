import React from 'react'
import './sidebar.css'
import { slide as Menu } from 'react-burger-menu'
import logo from '../images/logo2.png'
import { Link } from 'react-router-dom'

const SideBar = props => {
    return (
        <Menu {...props} id='appId'>
            <Link className='menu-item' to='/'>
                <img src={logo} alt='' width={90} />
            </Link>
            <Link className='menu-item' to='/'>
                Home
            </Link>

            <Link className='menu-item' to='/'>
                News
            </Link>

            <Link className='menu-item' to='/shop'>
                Store
            </Link>

            <Link className='menu-item' to='/'>
                Media
            </Link>
        </Menu>
    )
}

export default SideBar
