import React from 'react'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'

import CustomButton from '../custom-button/cutom-button.component'
import CartItem from '../cart-item/cart-item.component'

import {selectCartItems, selectCartItemsCount} from '../../redux/cart/cart.selectors'

import {toggleCartHidden} from '../../redux/cart/cart.actions'

import './cart-dropdown.styles.scss'

const CartDropdown = ({ cartItems, history, dispatch, itemCount }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                cartItems.map(cartItem => (
                <CartItem key = {cartItem.id} item ={cartItem} />
            ))) : (
                <span className="empty-message">Your cart is empty</span>
            )
            }
        </div>
            <CustomButton 
                onClick = {() => {
                history.push('/checkout')
                dispatch(toggleCartHidden())}}>
                Go to checkout ({itemCount})
            </CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemCount: selectCartItemsCount
})

export default withRouter(connect(mapStateToProps)(CartDropdown))
