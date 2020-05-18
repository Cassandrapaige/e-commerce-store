import React from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount, history }) => (
  <div className="cart-icon" onClick = {() => {
                history.push('/checkout')}}>
        <i className="fas fa-shopping-cart"></i>
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default withRouter(connect(mapStateToProps)(CartIcon));