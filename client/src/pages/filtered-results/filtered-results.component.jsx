import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import { selectCollectionByFilter} from '../../redux/shop/shop.selectors'

import CollectionsContainer from '../../components/collection-container/collection-container.component'
import CollectionItem from '../../components/collection-item/collection-item.component'

const FilteredResultsPage = ({ collections, match }) => {
    return (
         <CollectionsContainer title={match.params.filter}>
            <div className="collection-preview">
                {collections.map(collection => collection.map(item => (
                    <CollectionItem key = {item.id} item={item}/>
                    ))
                )}
            </div>
        </CollectionsContainer>
)}

const mapStateToProps = (state, ownProps) => ({
    collections: selectCollectionByFilter(ownProps.match.params.filter)(state),
})

export default connect(mapStateToProps)(FilteredResultsPage)
