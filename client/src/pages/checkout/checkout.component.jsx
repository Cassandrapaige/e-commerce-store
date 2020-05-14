import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartItems} 
        from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

import CheckoutSummary from '../../components/checkout-summary/checkout-summary.component'

import './checkout.styles.scss'

const CheckoutPage = ({cartItems}) => (
    <div className="checkout-page">
        <div className="checkout-items">
            <h2>Bag</h2>
            {!cartItems.length && 'There are no items in your bag.'}
        {
            cartItems.map(cartItem => 
                <CheckoutItem key={cartItem.id} cartItem = {cartItem} />
            )
        }
        </div>
        <CheckoutSummary />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CheckoutPage)
