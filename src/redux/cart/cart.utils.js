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
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToRemove.id && cartItem.size === cartItemToRemove.size
    );
  
    if (existingCartItem.quantity === 1) {
        window.location.reload();
        return cartItems.filter(cartItem => cartItem !== cartItemToRemove);
    }
  
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id && cartItem.size === cartItemToRemove.size
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };

export const clearItemFromCart = (cartItems, cartItemsToClear) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemsToClear.id && cartItem.size === cartItemsToClear.size
    )

    return cartItems.filter(cartItem => cartItem !== exisitingCartItem)
}