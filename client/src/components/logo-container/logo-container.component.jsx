import React from 'react'

import {LogoContainer, LogoImage} from './logo-container.styles'

const Logo = ({...rest}) => (
    <LogoContainer to = '/' {...rest}>
        <LogoImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png' alt="logo"/>
    </LogoContainer>
)

export default Logo