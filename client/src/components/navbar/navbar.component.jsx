import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import { signOutStart } from '../../redux/user/user.actions';

import CartIcon from '../cart-icon/cart-icon.components'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import Logo from '../logo-container/logo-container.component'

import SignIn from '../sign-in/sign-in.component'

import './navbar.styles.scss'

import {
    NavbarContainer,
    OptionsContainer,
    OptionLink,
} from './navbar.styles'
import SearchInput from '../search-input/search-input.component'

const Navbar = ({ currentUser, hidden, signOutStart }) => {
    const [showSignInDropdown, setShowSignInDropdown] = useState(false)

    return (
    <>
    <NavbarContainer>
        <div className="upper-nav">
            {
            currentUser ? 
                <OptionLink as='div' onClick = {signOutStart} > <i className="fas fa-user"></i> My Profile </OptionLink>
                :
                <OptionLink as ='div' onClick = {() => setShowSignInDropdown(!showSignInDropdown)}>Join/Sign In to Nike Member Profile</OptionLink>
            }
            <a href = 'https://twitter.com/CassandraPaigee' target='_blank'>Help</a>
            <CartIcon />
            <OptionLink as = 'div'><i className="fas fa-map-marker-alt"></i> Canada</OptionLink>
        </div>
        <div className="lower-nav">
          <Logo/>

            <OptionsContainer>
                <OptionLink isCollection to ='/shop'>COLLECTIONS</OptionLink>
                <OptionLink isCollection to ='/shop/mens'>MENS</OptionLink>
                <OptionLink isCollection to ='/shop/womens'>WOMENS</OptionLink>
                <OptionLink isCollection to ='/shop/kids'>KIDS</OptionLink>
            </OptionsContainer>
            <SearchInput />
        </div>
        <CartDropdown hidden = {hidden}/> 
    </NavbarContainer>
    <SignIn hidden = {showSignInDropdown} setHidden = {setShowSignInDropdown}/>
</>
)}

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