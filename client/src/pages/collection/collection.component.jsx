import React from 'react'
import {connect} from 'react-redux'

import {selectCollection} from '../../redux/shop/shop.selectors'

import CollectionsContainer from '../../components/collection-container/collection-container.component'
import CollectionPreview from '../../components/preview-collection/preview-collection.component'

const CollectionPage = ({ collection, match }) => {
    const {title, items} = collection

    return (
        <CollectionsContainer title = {title}>
            <CollectionPreview items = {items}/>
        </CollectionsContainer>
)}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
})

export default connect(mapStateToProps)(CollectionPage)
