import React from 'react'

import {connect} from 'react-redux'
import {selectCollectionBySearchQuery} from '../../redux/shop/shop.selectors'
import CollectionsContainer from '../../components/collection-container/collection-container.component'
import CollectionItem from '../../components/collection-item/collection-item.component'

const SearchResultsPage = ({ collections, history, match }) => {
    const query = history.location.search.slice(1).toLowerCase().replace(/%20/g, ' ');

    return (
        <div className = 'shop-page'>
          <CollectionsContainer title={`Results for ${query}`}>
            <div className="collection-preview">
                {collections.map(collection => collection.map(item => (
                    <CollectionItem key = {item.id} item={item}/>
                    ))
                )}
            </div>
        </CollectionsContainer>
    </div>
    )}

const mapStateToProps = (state, ownProps) => ({
    collections: selectCollectionBySearchQuery(ownProps.history.location.search.slice(1).toLowerCase())(state),
})

export default connect(mapStateToProps)(SearchResultsPage)
