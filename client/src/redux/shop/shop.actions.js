import ShopActionTypes from './shop.types'

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchFilteredCollection = collection => ({
    type: ShopActionTypes.FETCH_FILTERED_COLLECTION,
    payload: collection
})

export const toggleFillterMenu = () => ({
    type: ShopActionTypes.TOGGLE_FILTER_MENU
})

export const toggleSortByDropdown = () => ({
    type: ShopActionTypes.TOGGLE_SORT_BY_DROPDOWN
})

export const filterCollectionByPrice = collection => ({
    type: ShopActionTypes.FILTER_COLLECTION_BY_PRICE,
    payload: collection
})