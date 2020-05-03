import React from 'react'

import './item-header.styles.scss'

const ItemHeader = ({item}) => {
    const {name, price, type, quantity} = item;
    return (
        <div className="item-header">
            <div className="item-header-upper">
                <span className="name">{name}</span>
                <span className="price">${price * quantity || price}</span>
            </div>
            <span className="type">{type}</span>
        </div>
    )
}

export default ItemHeader