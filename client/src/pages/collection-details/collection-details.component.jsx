import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {selectItemDetails, selectCollectionByFilter} from '../../redux/shop/shop.selectors'

import CollectionDetails from '../../components/collection-details/collection-details.component'
import ScrollingContainer from '../../components/scrolling-wrapper/scrolling-wrapper.component'

const CollectionDetailsPage = ({collections, selectCollectionByFilter, match}) => {
    const [isLoading, setIsLoading] = useState(false);

    const id = match.params.itemId;
    const collectionLength = 12;

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    /*
        Find the first tag in collection array to filter similar data
        (Tag at index 0 is always equal to 'Lifestyle')
    */

    const matchedTag = collections
        .filter(collection => collection.length > 0)
        .map(collection => collection
        .map(item => item.tags[1]))

    /*
        Ensure that similar collection is always Nth items long.
        If Nth items don't exist for a given tag, pad onto the end of array
        using products including 'lifestyle' tag
    */

    const getSimilarCollection = value => {
        const similar = selectCollectionByFilter(value);
        const padItems = selectCollectionByFilter('lifestyle');

        return similar.length >= collectionLength ?
            similar : [...similar, ...padItems]
    }

    /*
        Remove any duplicates that might be present in the array,
        filter out the current collection item,
        and then return an array containing Nth items.
    */

    const getCollection = value => 
        getSimilarCollection(value.toString())
        .flat(1)
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
        .filter(item => item.id != id)
        .filter((item, idx) => idx < collectionLength);

    return (
        <div className = 'collection-details-page'>
           {collections.map(collection => (
               <CollectionDetails items = {collection} isLoading = {isLoading}/>
            ))
            }
            <ScrollingContainer isLoading = {isLoading} collections = {getCollection(matchedTag)} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collections: selectItemDetails(ownProps.match.params.itemId)(state),
    selectCollectionByFilter: value => selectCollectionByFilter(value)(state),
})

export default connect(mapStateToProps)(CollectionDetailsPage)