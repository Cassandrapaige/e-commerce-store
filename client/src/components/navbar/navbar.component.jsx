import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import { signOutStart } from '../../redux/user/user.actions';

import CartIcon from '../cart-icon/cart-icon.components'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import Logo from '../logo-container/logo-container.component'

import SignIn from '../sign-in/sign-in.component'

import {
    UpperNavbar,
    LowerNavbar,
    MobileNavbar,
    NavbarContainer,
    OptionsContainer,
    OptionLink,
    HamburgerIconContainer,
    HamburgerIconBottom,
    HamburgerIconTop,
    HamburgerIconMiddle,
    MobileIcons
} from './navbar.styles'
import SearchInput from '../search-input/search-input.component'

const Navbar = ({ currentUser, hidden, signOutStart }) => {
    const [showSignInDropdown, setShowSignInDropdown] = useState(false)

    return (
    <>
    <NavbarContainer>
        <UpperNavbar>
            {
            currentUser ? 
                <OptionLink as='div' onClick = {signOutStart} > <i className="fas fa-user"></i> My Profile </OptionLink>
                :
                <OptionLink as ='div' onClick = {() => setShowSignInDropdown(!showSignInDropdown)}>Join/Sign In to Nike Member Profile</OptionLink>
            }
            <a href = 'https://twitter.com/CassandraPaigee' target='_blank' rel="noopener noreferrer" >Help</a>
            <CartIcon />
            <OptionLink as = 'div'><i className="fas fa-map-marker-alt"></i> Canada</OptionLink>
        </UpperNavbar>

        <LowerNavbar>
          <Logo/>
            <OptionsContainer>
                <OptionLink to ='/shop/mens'>MENS</OptionLink>
                <OptionLink to ='/shop/womens'>WOMENS</OptionLink>
                <OptionLink to ='/shop/kids'>KIDS</OptionLink>
                <OptionLink to ='/shop'>COLLECTIONS</OptionLink>
            </OptionsContainer>
            <SearchInput />
        </LowerNavbar>
        <CartDropdown hidden = {hidden}/> 

        <MobileNavbar>
            <Logo />
            <MobileIcons>
                <i className="fas fa-search" style= {{fontSize: '20px'}}></i>
                <CartIcon isMobile/>
                <HamburgerIconContainer>
                    <HamburgerIconTop/>
                    <HamburgerIconMiddle/>
                    <HamburgerIconBottom/>
                </HamburgerIconContainer>
            </MobileIcons>
        </MobileNavbar>
  
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