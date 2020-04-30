import React from 'react'
import {withRouter} from 'react-router-dom'

import './preview-collection.styles.scss'

import CollectionItem from '../collection-item/collection-item.component'
import CustomButton from '../custom-button/cutom-button.component'

const CollectionPreview = ({title, items, mainImg, routeName, history, match}) => (
    <div className="collection-preview">
        <div className="preview">
            {items.map(item => (
                <CollectionItem key = {item.id} item={item}/>
                ))
            }
            <div className="see_more" style= {{ backgroundImage: `url(${mainImg})`}}>
                <CustomButton      
                onClick = {() => {history.push(`${match.url}/${routeName}`)}}>
                Shop {routeName}</CustomButton> 
            </div>
        </div>
    </div>
)

export default withRouter(CollectionPreview)