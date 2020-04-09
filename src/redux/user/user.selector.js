import {createSelector} from 'reselect'

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    // first argumnet is an array of our input selectors
    [selectUser],
    // Second argumnet is a function that receives the return value of our input selector
    (user) => user.currentUser
)