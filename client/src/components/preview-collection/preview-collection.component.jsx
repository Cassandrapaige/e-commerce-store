import React from 'react'
import {withRouter} from 'react-router-dom'

import './preview-collection.styles.scss'

import CollectionItem from '../collection-item/collection-item.component'

const CollectionPreview = ({items, num = items.length, children}) => {
    return(
    <div className="collection-preview">
        {items.filter((item, idx) => idx < num).map(item => (
            <CollectionItem key = {item.id} item={item}/>
            ))
        }
        {children}
    </div>
)}

export default withRouter(CollectionPreview)