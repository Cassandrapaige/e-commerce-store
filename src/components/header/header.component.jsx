import React from 'react'

import './header.styles.scss'

const Header = () => {
    return (
        <header style = {{backgroundImage: `url(https://weeattogether.com/wp-content/uploads/2017/01/Lemon-Mint-Pasta0190-e1485934512694.jpg)`}}>
            <div className="overlay">
                <h1 className="header_title">
                    All your favourite comfort foods
                </h1>
                <span>Delivered straight to your door <i class="fas fa-truck"></i></span>
            </div>
        </header>
    )
}

export default Header;