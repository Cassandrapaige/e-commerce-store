import React from 'react'
import {connect} from 'react-redux'
import {getItemDetails} from '../../redux/shop/shop.selectors'
import CollectionDetails from '../../components/collection-details/collection-details.component'

const CollectionDetailsPage = ({collections}) => {
    console.log(collections)
    return (
        <div>
           {collections.map(collection => (
               <CollectionDetails items = {collection}/>
            ))
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collections: getItemDetails(ownProps.match.params.itemId)(state)
})

export default connect(mapStateToProps)(CollectionDetailsPage)