import React from 'react'

import {Overlay} from './background-overlay.styles'

const BackgroundOverlay = ({handleClick, ...props}) => (
    <Overlay onClick = {handleClick} {...props}/>
)

export default BackgroundOverlay