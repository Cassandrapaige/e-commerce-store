// The root reducer is what combines all of our other states together

import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

export default combineReducers({
    user: userReducer,
    cart: cartReducer
})