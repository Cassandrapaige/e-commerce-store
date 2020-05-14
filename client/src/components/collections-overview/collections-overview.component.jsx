import React from 'react'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../preview-collection/preview-collection.component'

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections }) => (
    <div className="collections-overview">
        {collections.map(({ routeName, id, ...rest}) => routeName !== undefined &&(
            <CollectionPreview key = {id} {...rest} />
        ))}
    </div>

)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)