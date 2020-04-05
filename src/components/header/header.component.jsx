import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { auth } from '../../firebase/firebase.utils'

import CartIcon from '../cart-icon/cart-icon.components'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import './header.styles.scss'

const Header = ({ currentUser, hidden }) => (
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
            <CartIcon />
        </nav>
        {
            hidden ? null :
            <CartDropdown />
        }
    </header>
)

const mapStateToProps = ({ user: {currentUser}, cart: {hidden} }) => ({
    currentUser,
    hidden
})

// connect is a HOF being passed down from redux
export default connect(mapStateToProps)(Header);