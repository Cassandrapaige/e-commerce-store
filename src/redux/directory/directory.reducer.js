const INITIAL_STATE = {
    sections: [
        {
            title: 'Womens',
            imageUrl: 'https://www.tennisnuts.com/images/product/full/WMNS-NIKE-LUNARTEMPO-2-818098_500_C_PREM.jpg',
            size: 'large',
            id: 4,
            linkUrl: 'shop/womens'
        },
        {
            title: 'Mens',
            imageUrl: 'https://www.tennisnuts.com/images/product/full/Nike-Zoom-Vomero-9-Mens-Running-Shoe-642195_003_C_PREM.jpg',
            size: 'large',
            id: 5,
            linkUrl: 'shop/mens'
        },
        {
            title: 'Kids',
            imageUrl: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oymq8x2fxuejhfaykeiv/air-vapormax-2019-older-shoe-vwwMlD.jpg',
            size: 'large',
            id: 5,
            linkUrl: 'shop/kids'
        }
    ]
}

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default directoryReducer