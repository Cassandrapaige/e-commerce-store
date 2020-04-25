import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


const StripeCheckoutButton = ({ price }) => {
    // stripe payments need to be genrated in cents, not dollars
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_XHSS2ag3hUzwaJJ2Sh7xzK45008zDyK2H8';

    // Submission callback => Ideally token would be sent to backend to process the charge 
    const onToken = token => {
        console.log(token)
        alert('Payment successful')
    }

    return (
        <StripeCheckout
            label = 'Pay Now'
            name = 'Cozy Eaters'
            billingAddress
            shippingAddress
            image = 'https://tse4.mm.bing.net/th?id=OIP.i2rxJS-RNO2pzvCiPrpdswHaHP&pid=Api'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton