import { createSelector } from 'reselect'

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden  
)
 
export const selectSuccessMessage = createSelector(
  [selectCart],
  cart => cart.successMessage 
)

  export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (count, cartItem) => 
        count + cartItem.quantity
      , 0)
  );

  export const selectCartSubtotal = createSelector(
    [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (count, cartItem) =>
          count + cartItem.quantity * cartItem.price,
        0
      )
  );

export const selectCartTaxes = createSelector(
    [selectCartSubtotal],
    cartItems => (cartItems * 0.13).toFixed(2)
)

export const selectShippingTotal = createSelector(
    [selectCartSubtotal],
    cartItems => cartItems >= 1 && cartItems < 200 ? 10.00 : 0.00
)

export const selectCartTotal = createSelector(
    [selectCartSubtotal, selectCartTaxes, selectShippingTotal],
    (cartItems, taxes, shipping) => 
        (Number(cartItems) + Number(taxes) + Number(shipping)).toFixed(2)
)
