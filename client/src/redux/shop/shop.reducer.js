import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
    isFilterMenuHidden: false,
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
        case ShopActionTypes.TOGGLE_FILTER_MENU:
            return {
                ...currentState,
                isFilterMenuHidden: !currentState.isFilterMenuHidden
            }
        default: 
            return currentState
    }
}

export default shopReducer