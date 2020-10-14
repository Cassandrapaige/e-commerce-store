import React from 'react'
import {animated, useSpring, useTransition, config} from 'react-spring'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'

import CustomButton from '../custom-button/cutom-button.component'
import CartItem from '../cart-item/cart-item.component'

import {selectCartItems, selectCartItemsCount, selectSuccessMessage} from '../../redux/cart/cart.selectors'

import {toggleCartHidden} from '../../redux/cart/cart.actions'

import './cart-dropdown.styles.scss'
import BackgroundOverlay from '../background-overlay/background-overlay.component'

const CartDropdown = ({ cartItems, history, toggleCartHidden, dispatch, hidden, successMessage, itemCount }) => {
    
    const transitions = useTransition(!hidden, null, {
        config: config.default,
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    })

return transitions.map(({ item, props}) => item && (
    <animated.div style = {props} >
    <div className="cart-dropdown">
        <div className="cart-dropdown-header">
            <div className="success-message">
                {successMessage &&
                    <span><i class="fas fa-check"></i>Added to cart</span>
                }
            </div>
            <div className="close-dropdown-btn" onClick = {toggleCartHidden}></div>
        </div>
    
        <div className="cart-items">
            {
                cartItems.length ? (
                <CartItem 
                    key = {cartItems[cartItems.length -1].cartId} 
                    item ={cartItems[cartItems.length -1]} />
            ) : (
                <span className="empty-message">Your cart is empty</span>
            )
            }
        </div>
        <div className="cart-buttons">
            <CustomButton inverted
                onClick = {() => {
                history.push('/checkout')
                toggleCartHidden()}}>
                View Bag ({itemCount})
            </CustomButton>
            <CustomButton 
                onClick = {() => {
                history.push('/checkout')
                toggleCartHidden()}}>
                Checkout
            </CustomButton>
        </div>
    </div>
    <BackgroundOverlay handleClick = {toggleCartHidden} />
    </animated.div>
))}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemCount: selectCartItemsCount,
    successMessage: selectSuccessMessage
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown))
