import React from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {CartIconContainer, ItemCount} from './cart-icon.styles'

const CartIcon = ({ toggleCartHidden, itemCount, history, ...props }) => (
  <CartIconContainer {...props} onClick = {() => {
                history.push('/checkout')}}>
        <i className="fas fa-shopping-cart"></i>
    <ItemCount>{itemCount}</ItemCount>
  </CartIconContainer>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default withRouter(connect(mapStateToProps)(CartIcon));