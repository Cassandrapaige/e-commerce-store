export const fetchCollectionByPrice = (type, collections) => {
    if(type === 'descending') {
        return  collections.map(collection => 
            collection.items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
    } else if(type === 'ascending') {
        return collections.map(collection => 
            collection.items.sort((a, b) => parseFloat(a.price) + parseFloat(b.price)))
    }
}