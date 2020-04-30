import {createSelector} from 'reselect'

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)

export const getItemDetails = (itemId) => createSelector(
    [selectCollectionForPreview],
    collections => collections.map(collection => 
        collection.items.filter(item => item.id == itemId)),
)