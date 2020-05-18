import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import { signOutStart } from '../../redux/user/user.actions';

import CartIcon from '../cart-icon/cart-icon.components'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import './navbar.styles.scss'

import {
    NavbarContainer,
    LogoContainer,
    Logo,
    OptionsContainer,
    OptionLink,
} from './navbar.styles'
import SearchInput from '../search-input/search-input.component'

const Navbar = ({ currentUser, hidden, signOutStart }) => (
    <NavbarContainer>
        <div className="upper-nav">
            {
            currentUser ? 
                <OptionLink as='div' onClick = {signOutStart} > <i class="fas fa-user"></i> My Profile </OptionLink>
                :
                <OptionLink to = '/login'>Join/Sign In to Nike Member Profile</OptionLink>
            }
            <a href = 'https://twitter.com/CassandraPaigee' target='_blank'>Help</a>
            <CartIcon />
            <OptionLink as = 'div'><i class="fas fa-map-marker-alt"></i> Canada</OptionLink>
        </div>
        <div className="lower-nav">
            <LogoContainer to = '/'>
                <Logo src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png' alt="logo"/>
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to ='/shop'>DISCOVER</OptionLink>
                <OptionLink to ='/shop/mens'>MENS</OptionLink>
                <OptionLink to ='/shop/womens'>WOMENS</OptionLink>
                <OptionLink to ='/shop/kids'>KIDS</OptionLink>
            </OptionsContainer>
            <SearchInput />
        </div>
        <CartDropdown hidden = {hidden}/> 
    </NavbarContainer>
)

// createStructuredSelector will automatically pass our top-level state into our selectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

// connect is a HOF being passed down from redux
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);