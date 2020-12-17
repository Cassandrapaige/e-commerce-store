import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import StripeCheckoutButton from '../stripe-button/stripe-button.component'

import './checkout-summary.styles.scss'
import {selectCartSubtotal, 
        selectCartTotal, 
        selectCartTaxes,
        selectShippingTotal } 
        from '../../redux/cart/cart.selectors'

const CheckoutSummary = ({total, subtotal, taxes, shipping}) => {
    return (
        <div className = 'checkout-summary'>
            <h2>Summary</h2>
            <div className="summary-groups">
                <div className="summary-group">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
                <div className="summary-group">
                    <span>Estimated Delivery & Handling</span>
                    <span>${shipping}</span>
                </div>
                <div className="summary-group">
                    <span>Taxes</span>
                    <span>${taxes}</span>
                </div>
            </div>
            <div className="cart-total">
                <div className="summary-group">
                    <span className="bold">Total</span>
                    <span className="bold">${total}</span>
                </div>
            </div>
            <div className="button-container">
                <StripeCheckoutButton  price = {total}/>
            </div>
            {/* <div className="test-warning">
                *Please use the following test credit card for payments* <br /><br />
                4242 4242 4242 4242 - Exp: 10/20 - CVV: 123
            </div> */}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    subtotal: selectCartSubtotal,
    total: selectCartTotal,
    taxes: selectCartTaxes,
    shipping: selectShippingTotal
})

export default connect(mapStateToProps)(CheckoutSummary)
