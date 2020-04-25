import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import logo from '../../assets/logo.png'
import { auth } from '../../firebase/firebase.utils'

import CartIcon from '../cart-icon/cart-icon.components'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import './navbar.styles.scss'

const Navbar = ({ currentUser, hidden }) => (
    <div class = 'nav'>
        <Link to = '/' className = 'logo-container'>
            <img src='https://tse4.mm.bing.net/th?id=OIP.i2rxJS-RNO2pzvCiPrpdswHaHP&pid=Api' alt="" className = 'logo'/>
        </Link>
        <nav className="options">
            <Link className = 'option' to = '/shop'>
                MENU
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
    </div>
)

// createStructuredSelector will automatically pass our top-level state into our selectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

// connect is a HOF being passed down from redux
export default connect(mapStateToProps)(Navbar);