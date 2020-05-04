import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions'

import Header from '../../components/header/header.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

import './homepage.styles.scss'

const Homepage = ({fetchCollectionsStartAsync}) => {

    useEffect(() => {
        fetchCollectionsStartAsync()
    }, [])
    return (
        <div className="homepage">
            <Header />
            <h3>Shop our collections</h3>
            <CollectionsOverview />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(Homepage)