import React from 'react'

import './header.styles.scss'

import image from '../../assets/nike.png'
const Header = () => {
    return (
        <header>
            <img src={image} alt=""/>  
            <div className="overlay">
                <h1>Just do it</h1>
            </div>
            <span>Shop now</span>

        </header>
    )
}

export default Header;