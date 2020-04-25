const INITIAL_STATE = {
    sections: [
        {
            title: 'Shareables',
            imageUrl: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=appetizer-bowl-delicious-1640772.jpg&fm=jpg',
            size: 'large',
            id: 3,
            linkUrl: 'shop/womens'
        },
        {
            title: 'Healthy Eating',
            imageUrl: 'https://www.smartertravel.com/uploads/2017/07/Buddha-Bowls-1024x710.jpg',
            size: 'large',
            id: 4,
            linkUrl: 'shop/mens'
        },
        {
            title: 'Indulgences',
            imageUrl: 'https://nationalpostcom.files.wordpress.com/2017/08/eatdeliciouscombof.jpg',
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