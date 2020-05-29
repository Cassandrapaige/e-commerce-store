export const addItemToCart = (cartItems, cartItemToAdd) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id && cartItem.size === cartItemToAdd.size)

            if(exisitingCartItem) {
                return cartItems.map(cartItem => 
                    cartItem.id === cartItemToAdd.id && cartItem.size === cartItemToAdd.size
                    ? {...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                )
            }
      
    return [...cartItems, { ...cartItemToAdd, quantity: 1, cartId: cartItemToAdd.id, id: new Date()}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToRemove.id
    )
  
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem !== existingCartItem)
    }
    
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}

export const clearItemFromCart = (cartItems, cartItemsToClear) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemsToClear.id && cartItem.size === cartItemsToClear.size
    )

    return cartItems.filter(cartItem => cartItem !== existingCartItem)
}
