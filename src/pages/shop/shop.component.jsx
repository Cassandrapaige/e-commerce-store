import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.compopnent'
import CollectionDetailsPage from '../collection-details/collection-details.component'

import './shop.styles.scss'

const ShopPage = ({match}) => (
    <div className = 'shop-page'>
        <Route exact path ={`${match.path}`} component = {CollectionsOverview} />
        <Route exact path = {`${match.path}/:collectionId`} component = {CollectionPage} />
        <Route exact path = {`${match.path}/details/:itemId`} component = {CollectionDetailsPage} />
    </div>
)

export default ShopPage