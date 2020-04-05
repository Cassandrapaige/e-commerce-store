import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import './App.scss';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount = () => {

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({

              // calling 'snapshot' allows us to see if the document exists, and receive ID
              id: snapshot.id,

              // attaching the .data() method returns a full JSON object with the documents data
              ...snapshot.data()
            })
          })
      }

      // user will be set to null
      setCurrentUser(userAuth)
    })
  }

  // Must unmount to avoid any memory leaks in subscription
  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path = '/shop' component = {ShopPage} />
            <Route exact path = '/login' component = {SignInAndSignUpPage} />
          </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

// connect takes in two arguments (objects): mapStateToProps and mapDispatchToProps
// pass null when you dont need to mapStateToProps
export default connect(null, mapDispatchToProps)(App);
