import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
    // stripe payments need to be genrated in cents, not dollars
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_XHSS2ag3hUzwaJJ2Sh7xzK45008zDyK2H8';

    // Submission callback => Ideally token would be sent to backend to process the charge 
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment was successful')
        }).catch(error => {
            console.log('Payment error: ' + JSON.parse(error))
            alert('There was an issue with your payment. Please make sure you use the provided credit card.')
        })
    }

    return (
        <StripeCheckout
            label = 'Pay Now'
            name = 'Nike'
            billingAddress
            shippingAddress
            image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton