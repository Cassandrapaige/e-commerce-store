import React, {useEffect} from 'react'
import {fetchCollectionsStart} from '../../redux/shop/shop.actions'

import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import Header from '../../components/header/header.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

import './homepage.styles.scss'

const Homepage = ({fetchCollectionsStart}) => {

useEffect(() => {
    fetchCollectionsStart()
}, [fetchCollectionsStart])

    return (
        <div className="homepage">
            <Header />
            <h3>Shop our collections</h3>
            <CollectionsOverview isPreview />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(Homepage)