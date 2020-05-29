import React from 'react'

import {ArrowIconContainer, FilterIconContainer} from './icons.styles'

export const ArrowIcon = ({...props}) => (
    <ArrowIconContainer {...props}>
        <span className = 'arrow-left'></span>
        <span className = 'arrow-left'></span>
    </ArrowIconContainer>  
)

export const FilterIcon = ({...props}) => (
    <FilterIconContainer {...props}></FilterIconContainer>
)