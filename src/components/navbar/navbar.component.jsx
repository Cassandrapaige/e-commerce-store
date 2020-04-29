import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import { auth } from '../../firebase/firebase.utils'

import CartIcon from '../cart-icon/cart-icon.components'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import {
    NavbarContainer,
    LogoContainer,
    Logo,
    OptionsContainer,
    OptionLink,
} from './navbar.styles'

const Navbar = ({ currentUser, hidden }) => (
    <NavbarContainer>
        <LogoContainer to = '/'>
            <Logo src='https://tse4.mm.bing.net/th?id=OIP.i2rxJS-RNO2pzvCiPrpdswHaHP&pid=Api' alt="logo"/>
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to = '/shop'>MENU</OptionLink>
            <OptionLink to = '/contact'>CONTACT</OptionLink>
            {
            currentUser ? 
                <OptionLink as='div' onClick = {() => auth.signOut()} > SIGN OUT </OptionLink>
                :
                <OptionLink to = '/login'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>

        { hidden ? null : <CartDropdown /> }
    </NavbarContainer>
)

// createStructuredSelector will automatically pass our top-level state into our selectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

// connect is a HOF being passed down from redux
export default connect(mapStateToProps)(Navbar);