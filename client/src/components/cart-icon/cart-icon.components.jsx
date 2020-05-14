import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {toggleCartHidden} from '../../redux/cart/cart.actions'
import { selectCartItemsCount} from '../../redux/cart/cart.selectors'

import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick = {toggleCartHidden}>
        <i className="fas fa-shopping-cart"></i>
        <span className="item-count">{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector ({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
