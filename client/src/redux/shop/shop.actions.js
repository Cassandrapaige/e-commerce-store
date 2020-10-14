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

export const toggleFillterMenu = () => ({
    type: ShopActionTypes.TOGGLE_FILTER_MENU
})

export const toggleSortByDropdown = () => ({
    type: ShopActionTypes.TOGGLE_SORT_BY_DROPDOWN
})

export const sortCollectionsByDescendingPrice = collection => ({
    type: ShopActionTypes.FETCH_COLLECTION_DESCENDING,
    payload: collection
})

export const sortCollectionsByAscendingPrice = collection => ({
    type: ShopActionTypes.FETCH_COLLECTION_ASCENDING,
    payload: collection
})