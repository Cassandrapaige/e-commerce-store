import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import {fetchCollectionsStart} from '../../redux/shop/shop.actions'
import {selectIsCollectionFetching, selectIsCollectionLoaded} from '../../redux/shop/shop.selectors'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.compopnent'
import CollectionDetailsPage from '../collection-details/collection-details.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import {updateCollections} from '../../redux/shop/shop.actions'

import './shop.styles.scss'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
const CollectionDetailsWithSpinner = WithSpinner(CollectionDetailsPage)

const ShopPage = ({match, isLoaded, fetchCollectionsStart}) => {

    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])

    return(
        <div className = 'shop-page'>
            <Route 
                exact path ={`${match.path}`} 
                render = {(props) => 
                <CollectionsOverviewWithSpinner isLoading = {!isLoaded} {...props} />} 
            />
            <Route 
                exact path = {`${match.path}/:collectionId`} 
                render = {(props) => 
                <CollectionPageWithSpinner isLoading = {!isLoaded} {...props} />} 
            />
            <Route 
                exact path = {`${match.path}/details/:itemId`} 
                render = {(props) => 
                <CollectionDetailsWithSpinner isLoading = {!isLoaded} {...props} />} 
            />
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    isLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)