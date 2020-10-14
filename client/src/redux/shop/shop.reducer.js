import SHOP_DATA from './shop.data'

import ShopActionTypes from './shop.types'

import {fetchCollectionByPrice} from './shop.utils'

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
    isFilterMenuHidden: false,
    isDropdownHidden: true,
}

const shopReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...currentState,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...currentState,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...currentState,
                isFetching: false,
                errorMessage: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTION_DESCENDING:
            return {
                ...currentState,
                collections: fetchCollectionByPrice('descending', currentState.collections)
            }
        case ShopActionTypes.FETCH_COLLECTION_ASCENDING:
            return {
                ...currentState,
                collections: fetchCollectionByPrice('ascending', currentState.collections)
            }
        case ShopActionTypes.TOGGLE_FILTER_MENU:
            return {
                ...currentState,
                isFilterMenuHidden: !currentState.isFilterMenuHidden
            }
        case ShopActionTypes.TOGGLE_SORT_BY_DROPDOWN:
            return {
                ...currentState,
                isDropdownHidden: !currentState.isDropdownHidden
            }
        default: 
            return currentState
    }
}

export default shopReducer