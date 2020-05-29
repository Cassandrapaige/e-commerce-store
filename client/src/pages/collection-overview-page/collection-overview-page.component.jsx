import React from 'react'

import CollectionsContainer from '../../components/collection-container/collection-container.component'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

const CollectionOverviewPage = () => {
    return (
        <CollectionsContainer title="See What's New">
            <CollectionsOverview/>
        </CollectionsContainer>
)}

export default CollectionOverviewPage
