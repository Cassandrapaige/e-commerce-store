import React from 'react'

import {connect} from 'react-redux'
import {selectCollectionForPreview} from '../../redux/shop/shop.selectors'

import CollectionContainer from '../../components/collection-container/collection-container.component'

const SearchResultsPage = ({ collections }) => {

    console.log(collections)
    return (
        <div className = 'search-results'>
    
        </div>
    )}

const mapStateToProps = (state, ownProps) => ({
    collections: selectCollectionForPreview(state)
})

export default connect(mapStateToProps)(SearchResultsPage)
