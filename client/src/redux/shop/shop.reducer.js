import SHOP_DATA from './shop.data'

import ShopActionTypes from './shop.types'

import {getCollectionByFilter} from './shop.utils'

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
    isFilterMenuHidden: false,
    isDropdownHidden: true,
    filter: undefined
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
        case ShopActionTypes.FETCH_FILTERED_COLLECTION:
            return {
                ...currentState,
                collections: action.payload
            }
        case ShopActionTypes.FILTER_COLLECTION_BY_PRICE:
            return {
                ...currentState,
                collections: () => console.log(currentState.collections.items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
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