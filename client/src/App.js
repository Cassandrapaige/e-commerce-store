import React, { Component, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Navbar from './components/navbar/navbar.component'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'
import CollectionDetailsPage from './pages/collection-details/collection-details.component'

import { 
      auth, 
      createUserProfileDocument, 
      addCollectionAndDocuments 
    } from './firebase/firebase.utils'

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

import { selectCartHidden } from './redux/cart/cart.selectors'

// import {selectCollectionForPreview} from './redux/shop/shop.selectors'

import './App.scss';

const App = (
      {// collectionsArray, 
      checkUserSession,
      hidden, 
      currentUser}) =>  {

  let unsubscribeFromAuth = null;

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

    return (
      <div>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path = '/shop' component = {ShopPage} />
            <Route exact path = '/checkout' component = {CheckoutPage} />
            <Route exact path = '/login' render = {() => currentUser ? 
                (<Redirect to = '/' />) : 
                (<SignInAndSignUpPage />)} />
          </Switch>
          {!hidden && <div className="screen-overlay"></div>}
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionForPreview,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

// connect takes in mapStateToProps and mapDispatchToProps as parameters
// pass null when you dont need to mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
