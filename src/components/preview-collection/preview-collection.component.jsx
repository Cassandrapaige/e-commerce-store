import React from 'react'

import './preview-collection.styles.scss'

import CollectionItem from '../collection-item/collection-item.component'

const CollectionPreview = ( {title, items, num} ) => (
    <div className="collection-preview">
        <h1 className = 'title'> {title.toUpperCase()} </h1>
            <div className="preview">
                {items
                    .filter((item, idx) => idx < num)
                    .map(item => (
                        <CollectionItem key = {item.id} item={item} />
                    ))
                }
            </div>
    </div>
)

export default CollectionPreview