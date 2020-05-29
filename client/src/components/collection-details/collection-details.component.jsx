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

    const [message, setMessage] = useState('');

    const getItemSize = (item, event) => {
        let value = event.target.value
        item.size = value
        setMessage('')
    }

    const addItemToCart = item => {
        if(item.size){
            addItem(item)
            hidden()
        } else {
            setMessage('Please select a size.')
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
                        <SizeChart 
                            message = {message}
                            handleChange = {(e) => getItemSize(item, e)} />
                            <div className="btn-container">
                                <CustomButton type= 'submit' 
                                    onClick = {() => addItemToCart(item)}>
                                    Add to Bag
                                </CustomButton>
                            </div>
                            <CustomButton inverted>
                                Favourite <i class="far fa-heart"></i>
                            </CustomButton>
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