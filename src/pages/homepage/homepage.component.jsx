import React from 'react'

import Header from '../../components/header/header.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

import './homepage.styles.scss'

const homepage = () => {
    return (
        <div className="homepage">
            <Header />
            <h3>Shop our collections</h3>
            <CollectionsOverview />
        </div>
    )
}

export default homepage;