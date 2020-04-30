import React, {useState} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import CustomButton from '../custom-button/cutom-button.component'
import {addItem} from '../../redux/cart/cart.actions'

import './collection-item.styles.scss'

const CollectionItem = ({ item, history, match}) => {
    const { name, price, type, imageUrl, images, id} = item
    const [showImages, setShowImages] = useState(false)
    const [image, setImage] = useState(imageUrl)

    const handleClick = type => setImage(type)
    const handleMouseEnter = () => setShowImages(true)
    const handleMouseLeave = () => {
        setShowImages(false)
        setImage(imageUrl)   
    }    
    
    return (
    <div className="collection-item" 
            onMouseEnter = {handleMouseEnter} 
            onMouseLeave = {handleMouseLeave}
            onClick = {() => {history.push(`/shop/details/${id}`)}}>

        <img src = {image} alt = {name} className = 'image'/>
        <div className="collection-footer">
            <div className="collection-footer-upper">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <span className="type">{type}</span>

        <div className="images">
                    
            {showImages ? 
            <div class = 'images-preview'>
                <img src = {imageUrl} alt = {name} 
                    onMouseEnter = {() => handleClick(imageUrl)}/>

                    {images
                        .filter((item, idx) => idx < 3)
                        .map(image => (

                    <img src={image} alt={name} 
                        onMouseEnter = {() => handleClick(image)}/>
                    ))}
                <div className="plus_images">+{images.length - 3}</div>
            </div>
            : <span>{images.length + 1} Images </span>}        
        </div>
    </div>
</div>
)}

export default withRouter(CollectionItem)