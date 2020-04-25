import React from 'react'
import { connect } from 'react-redux'

import CustomButton from '../custom-button/cutom-button.component'
import {addItem} from '../../redux/cart/cart.actions'

import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem }) => {
    const { name, price, description, imageUrl, tags} = item;
    return (
    <div className="collection-item">
        <div 
            className="image"
            style= {{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="description">{description}</span>
        </div>
        <div className="collection-tags">
            {tags.map(tag => <span className = 'tag'>{tag}</span>)}
        </div>
        <CustomButton onClick = {() => addItem(item)} inverted>{price}<i class="fas fa-cart-arrow-down"></i> </CustomButton>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)