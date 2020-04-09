import CartActionTypes from './cart.types'
import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...currentState,
                hidden: !currentState.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...currentState,
                cartItems: addItemToCart(currentState.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...currentState,
                cartItems: removeItemFromCart(currentState.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...currentState,
                cartItems: currentState.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id)
            }
        default:
            return currentState;
    }
}

export default cartReducer