import React from 'react'
import {connect} from 'react-redux'

import {addItem} from '../../redux/cart/cart.actions'

import Video from '../video/video.component'
import CustomButton from '../custom-button/cutom-button.component'

import './collection-details.styles.scss'

const CollectionDetails = ({items, addItem}) => {
    return (
        <div className = 'collection-details'>
            {items.map(item => (
                <>
                <div className="details-image-grid">
                    <img src={item.imageUrl} alt=""/>
                    <Video url = {item.videoUrl}/>
                    {item.images.map(image => (
                        <img src={image} alt=""/>
                     ))}
                </div>

                <div className = 'details'>
                    <div className="details-upper">
                        <span>{item.type}</span>
                        <span>${item.price}</span>
                    </div>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>

                    <CustomButton onClick = {() => addItem(item)}>Add to Bag</CustomButton>
                    <CustomButton inverted>Favourite <i class="far fa-heart"></i></CustomButton>
                </div>
                </>
            ))}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionDetails)