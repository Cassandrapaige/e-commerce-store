import React from 'react'
import {withRouter} from 'react-router-dom'

import SkeletonScreen from '../skeleton-screen/skeleton-screen.component'
import ItemHeader from '../item-header/item-header.component'

import {ImageContainer} from './item-details.styles'

const ItemDetails = ({image, item, history, isLoading, ...props}) => {
    const {name, id} = item;
    return (
        <div className="item-details" onClick = {() => {history.push(`/shop/details/${id}`)}}>
        {isLoading ?
            <ImageContainer as = 'div' {...props}>
                <SkeletonScreen />
            </ImageContainer>
            :
            <ImageContainer src = {image} alt = {name} {...props}/>
            }
        <ItemHeader item = {item} />
        </div>
    )
}

export default withRouter(ItemDetails);