import React, {useState} from 'react'
import {connect} from 'react-redux'

import {addItem} from '../../redux/cart/cart.actions'
import {toggleCartHidden} from '../../redux/cart/cart.actions'

import Video from '../video/video.component'
import CustomButton from '../custom-button/cutom-button.component'
import SizeChart from '../size-chart/size-chart.component'
import ItemHeader from '../item-header/item-header.component'

import './collection-details.styles.scss'

const CollectionDetails = ({items, addItem, hidden}) => {      

    const handleChange = (item, event) => {
        let value = event.target.value
        item.size = value
    }

    const handleClick = (event, item) => {
        if(item.size){
            addItem(item)
            hidden()
        }
        return false
    }

    return (
        <div className = 'collection-details'>
            {items.map(item => (
                <>
                <div className="details-image-grid">
                    <img src={item.imageUrl} alt={item.name}/>
                    {item.videoUrl && <Video url = {item.videoUrl}/>}
                    
                    {item.images.map(image => (
                        <img src={image} alt={item.name}/>
                     ))}
                </div>

                <div className = 'details'>
                    <ItemHeader item = {item} />
                    <img src={item.imageUrl} alt={item.name} id = 'image-show-md'/>
                    <form onSubmit = {event => event.preventDefault()}>
                        <SizeChart handleChange = {(e) => handleChange(item, e)}>
                            <CustomButton type= 'submit' 
                                onClick = {event => {handleClick(event, item)}}>
                                Add to Bag
                            </CustomButton>
                            <CustomButton inverted>
                                Favourite <i class="far fa-heart"></i>
                            </CustomButton>
                        </SizeChart>
                    </form>
                    <p>{item.description}</p>
                    <ul><li>Colour Shown: {item.colour}</li></ul>
                </div>
                </>
            ))}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    hidden: () => dispatch(toggleCartHidden())
})

export default connect(null, mapDispatchToProps)(CollectionDetails)