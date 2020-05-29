import {createSelector} from 'reselect'

const selectShop = state => state.shop

export const selectFilterMenu = createSelector(
    [selectShop],
        shop => shop.isFilterMenuHidden
)

export const selectSortByDropdown = createSelector(
    [selectShop],
        shop => shop.isDropdownHidden
)

export const selectCollections = createSelector(
    [selectShop],
        shop => shop.collections
)

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections 
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
)

export const selectItemDetails = itemId => createSelector(
    [selectCollectionForPreview],
    collections => collections
        .map(collection => collection.items
        .filter(item => item.id == itemId))
)

export const selectCollectionByFilter = value => createSelector(
    [selectCollectionForPreview],
    collections => collections
        .map(collection => collection.items
        .filter(item => item.tags.includes(value)))
)

export const selectCollectionTags = createSelector(
    [selectCollectionForPreview],
    collections => collections
        .map(collection => collection.items.map(item => item.tags).flat(1))
)

export const selectCollectionByQuery = query => createSelector(
    [selectCollectionForPreview],
    collections => collections.filter(item => item.title.includes(query))
)
