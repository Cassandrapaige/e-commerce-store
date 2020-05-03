import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors'

import { auth } from '../../firebase/firebase.utils'

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

const Navbar = ({ currentUser, hidden, routeName, collections }) => (
    <NavbarContainer>
        <div className="upper-nav">
            {
            currentUser ? 
                <OptionLink as='div' onClick = {() => auth.signOut()} > <i class="fas fa-user"></i> My Profile </OptionLink>
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
                {collections.map(collection => (
                    <OptionLink to = {`/shop/${collection.routeName}`}>{collection.routeName.toUpperCase()}</OptionLink>
                ))}
        
            </OptionsContainer>
            <SearchInput />
        </div>
        { !hidden && <CartDropdown /> }
    </NavbarContainer>
)

// createStructuredSelector will automatically pass our top-level state into our selectors
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    collections: selectCollectionForPreview

})

// connect is a HOF being passed down from redux
export default connect(mapStateToProps)(Navbar);