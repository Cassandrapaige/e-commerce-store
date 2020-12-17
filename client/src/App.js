import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Navbar from './components/navbar/navbar.component'
import Spinner from './components/spinner/spinner.component'
import Footer from './components/footer/footer.component'

// import { 
//       auth, 
//       createUserProfileDocument, 
//       addCollectionAndDocuments 
//     } from './firebase/firebase.utils'

import {checkUserSession } from './redux/user/user.actions';

import { selectCartHidden } from './redux/cart/cart.selectors'
import { selectCurrentUser } from './redux/user/user.selector';

// import {selectCollectionForPreview} from './redux/shop/shop.selectors'

import './App.scss';

const Homepage = lazy(() => import('./pages/homepage/homepage.component'))
const SearchResultsPage = lazy(() => import('./pages/search-results/search-results.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))
const HireMePage = lazy(() => import('./pages/hire_me/hire_me.component'))

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
      <div className = 'App'>
        <ScrollToTop />
        <Navbar/>
        <div className="container">
          <Switch>
            <Suspense fallback = {<Spinner />}>
              <Route exact path='/' component={Homepage} />
              <Route path = '/search' component={SearchResultsPage} />
              <Route path = '/shop' component = {ShopPage} />
              <Route exact path = '/checkout' component = {CheckoutPage} />
              <Route exact path = '/justdoit' component = {HireMePage} />
              <Route exact path = '/login' render = {() => currentUser ? 
                  (<Redirect to = '/' />) : 
                  (<SignInAndSignUpPage />)} />
            </Suspense>
          </Switch>
        </div>
          <Footer />
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionForPreview,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

// connect takes in mapStateToProps and mapDispatchToProps as parameters
// pass null when you dont need to mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
