// The root reducer is what combines all of our other states together

import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'

export default combineReducers({
    user: userReducer
})