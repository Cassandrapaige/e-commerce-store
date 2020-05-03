export const addItemToCart = (cartItems, cartItemToAdd) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id && cartItem.size === cartItemToAdd.size)

        if(exisitingCartItem) {
            return cartItems.map(cartItem => 
                cartItem === exisitingCartItem
                ? {...cartItem, quantity: cartItem.quantity + 1, size: cartItem.size }
                : cartItem
            )
        }

        return [...cartItems, { ...cartItemToAdd, quantity: 1, size: cartItemToAdd.size}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id && cartItem.size === cartItemToRemove.size
    )

    if(exisitingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem !== exisitingCartItem)
    }

    return cartItems.map(cartItem => cartItem === exisitingCartItem ? 
            { ...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        ) 
}

export const clearItemFromCart = (cartItems, cartItemsToClear) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemsToClear.id && cartItem.size === cartItemsToClear.size
    )

    return cartItems.filter(cartItem => cartItem !== exisitingCartItem)
}