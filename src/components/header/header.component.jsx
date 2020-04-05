import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase.utils'

import './header.styles.scss'

const Header = ({ currentUser }) => (
    <header>
        <Link to = '/' className = 'logo-container'>
            <Logo className = 'logo'/>
        </Link>
        <nav className="options">
            <Link className = 'option' to = '/shop'>
                SHOP
            </Link>
            <Link className = 'option' to = '/contact'>
                CONTACT
            </Link>

            {
                currentUser ? 
                <div className='option' onClick = {() => auth.signOut()} > SIGN OUT </div>
                :
                <Link className = 'option' to = '/login'>
                SIGN IN
                </Link>
            }
        </nav>
    </header>
)

export default Header;