import React, {useEffect, lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {fetchCollectionsStart} from '../../redux/shop/shop.actions'

import Spinner from '../../components/spinner/spinner.component'

const CollectionOverviewPage = lazy(() => import('../collection-overview-page/collection-overview-page.component'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));
const CollectionDetailsPage = lazy(() => import('../collection-details/collection-details.component'));
const FilteredResultsPage = lazy(() => import('../filtered-results/filtered-results.component'));

const ShopPage = ({match, fetchCollectionsStart}) => {

    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])

    return(
        <div className = 'shop-page'>
            <Suspense fallback = {<Spinner />}>
            <Route 
                exact path ={`${match.path}`} 
                component = {CollectionOverviewPage}
            />
            <Route 
                exact path = {`${match.path}/:collectionId`} 
                component = {CollectionPageContainer}
            />
            <Route 
                exact path ={`${match.path}/filter/:filter`} 
                component = {FilteredResultsPage}
            />
            <Route 
                exact path = {`${match.path}/details/:itemId`} 
                component = {CollectionDetailsPage}
            />
            </Suspense>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)