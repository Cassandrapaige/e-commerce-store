import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {clearItemFromCart, 
        addItem, 
        removeItem} 
        from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'
import ItemHeader from '../item-header/item-header.component'

const CheckoutItem = ({ history, cartItem, clearItem, addItem, removeItem }) => {
const {imageUrl, name, type, quantity, price, id, size, colour} = cartItem;
return (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt={name} onClick = {() => {history.push(`/shop/details/${id}`)}}/>
        </div>

    <div className="checkout-info">
        <div>
        <ItemHeader item = {cartItem}>
            <span className = 'colour'>{colour}</span>
        </ItemHeader>
        <div className="checkout-dropdowns">
            <div className="size">
                <span>Size {size}</span>
            </div>
            <div className="quantity">
                <div className="arrow" onClick = {() => removeItem(cartItem)}>&#10094;</div>
                    <span className="value">Quantity {quantity}</span>
                <div className="arrow" onClick = {() => addItem(cartItem)}>&#10095;</div>
            </div>
        </div>
        </div>
        <div className="remove-button" onClick = {() => clearItem(cartItem)}>Remove</div>
    </div>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(CheckoutItem))
