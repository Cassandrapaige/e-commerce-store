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
    const [isChecked, setIsChecked] = useState(false)

    const handleChange = event => {
        setIsChecked(true)
        items.map(item => item.size = event.target.value)
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
                    <SizeChart handleChange = {handleChange}>
                        <CustomButton type= 'submit' 
                            onClick = {() => {
                            hidden()
                            addItem(item)}}>
                            Add to Bag
                        </CustomButton>
                        <CustomButton inverted>
                            Favourite <i class="far fa-heart"></i>
                        </CustomButton>
                    </SizeChart>
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