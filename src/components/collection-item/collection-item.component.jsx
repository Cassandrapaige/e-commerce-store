import React, {useState} from 'react'
import { connect } from 'react-redux'

import CustomButton from '../custom-button/cutom-button.component'
import {addItem} from '../../redux/cart/cart.actions'

import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem }) => {
    const { name, price, type, imageUrl, images} = item
    const [showImages, setShowImages] = useState(false)
    const [image, setImage] = useState(imageUrl)

    const handleClick = type => setImage(type)
    const handleMouseEnter = () => setShowImages(true)
    const handleMouseLeave = () => {
        setShowImages(false)
        setImage(imageUrl)
    }    
    
    return (
    <div className="collection-item">
        <img src = {image} alt = {name} className = 'image'/>

        <div className="collection-footer">
            <div className="collection-footer-upper">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <span className="type">{type}</span>

        <div className="images" 
            onMouseEnter = {handleMouseEnter} 
            onMouseLeave = {handleMouseLeave}>
                    
            {showImages ? 
            <><img src = {imageUrl} alt = {name} onClick = {() => handleClick(imageUrl)}/>
                {images.map(image => (
                <img src={image} alt={name} onClick = {() => handleClick(image)}/>
            ))}</>
            : <span>{images.length + 1} Images </span>}        
        </div>
    </div>
</div>
)}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)