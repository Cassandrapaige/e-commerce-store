import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'

import {selectFilterMenu} from '../../redux/shop/shop.selectors'

import CustomButton from '../custom-button/cutom-button.component'

import {ImageContainer, 
        ImageGridContainer, 
        ImagePreviewContainer, 
        Image,
        CollectionItemFooter,
        CollectionItemContainer} from './collection-item.styles'

import ItemHeader from '../item-header/item-header.component'
import ItemDetails from '../item-details/item-details.component'

const CollectionItem = ({ item, match, isFilterMenuHidden}) => {
    const { name, price, type, imageUrl, images, id} = item
    const [showImages, setShowImages] = useState(false)
    const [image, setImage] = useState(imageUrl)
    const [isLoading, setIsLoading] = useState(true)

    const handleClick = type => {
        setImage(type);
    }
    
    const handleMouseEnter = () => setShowImages(true)
    const handleMouseLeave = () => {
        setShowImages(false)
        setImage(imageUrl)   
    }    
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    return (
    <CollectionItemContainer
        onMouseEnter = {handleMouseEnter} 
        onMouseLeave = {handleMouseLeave}>

        <ItemDetails 
            isLoading = {isLoading} 
            withMargin = {isFilterMenuHidden} 
            image = {image}
            item = {item} />
        <CollectionItemFooter>
        <ImagePreviewContainer>   
            {showImages && !isLoading ? 
            <ImageGridContainer>
                <Image src = {imageUrl} alt = {name} 
                    onMouseEnter = {() => handleClick(imageUrl)}/>

                    {images.filter((item, idx) => idx < 3)
                        .map((image, index) => (

                    <Image 
                        src={image} 
                        alt={name} 
                        key = {index}
                        onMouseEnter = {() => handleClick(image)}/>
                    ))}
                <div className="plus_images">+{images.length - 3}</div>
            </ImageGridContainer>

            : <span>{images.length + 1} Images </span>}        
        </ImagePreviewContainer>
    </CollectionItemFooter>
</CollectionItemContainer>
)}

const mapStateToProps = createStructuredSelector({
    isFilterMenuHidden: selectFilterMenu
})

export default connect(mapStateToProps)(CollectionItem)