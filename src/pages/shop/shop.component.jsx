import React, { Component } from 'react'

import SHOP_DATA from './shop.data'

import CollectionPreview from '../../components/preview-collection/preview-collection.component'

class ShopPage extends Component {
constructor(props) {
    super(props)
    this.state = {
        collections: SHOP_DATA
    }
}
    render() {
        const { collections } = this.state;

        return (
            <div className = 'shop-page'>
                {
                    collections.map(({id, ...rest}) => (
                        <CollectionPreview key={id} {...rest} num = '4'/>
                    ))
                }
            </div>
        )
    }
}

export default ShopPage