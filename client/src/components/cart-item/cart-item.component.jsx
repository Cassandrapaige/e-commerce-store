import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {toggleCartHidden} from '../../redux/cart/cart.actions'

import ItemHeader from '../item-header/item-header.component'

import './cart-item.styles.scss'

const CartItem = ({item, history, dispatch}) => {
    
    const {imageUrl, name, id, size} = item;
    return (
    <div className="cart-item" onClick = {() => {
        dispatch(toggleCartHidden())
        history.push(`/shop/details/${id}`)}}
    >
        <div className="cart-image-container">
            <img src={imageUrl} alt={name}/>
        </div>
        <div className="item-details">
            <ItemHeader item = {item}/>
            <span>Size {size}</span>
        </div>
    </div>
)}

export default withRouter(connect()(CartItem))
