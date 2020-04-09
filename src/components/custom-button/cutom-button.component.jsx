import React from 'react'

import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, ...rest }) => (
    <button className={`custom-button 
    ${inverted ? 'inverted' : ''}
    ${isGoogleSignIn ? 'google-sign-in' : ''}`}
    { ...rest }>
        {children}
    </button>
)

export default CustomButton