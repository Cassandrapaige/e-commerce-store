import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {fetchCollectionsStart} from '../../redux/shop/shop.actions'

import Header from '../../components/header/header.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

import './homepage.styles.scss'

const Homepage = ({fetchCollectionsStart}) => {

    useEffect(() => {
        fetchCollectionsStart()
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
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(Homepage)