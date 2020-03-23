import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.scss';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { auth } from './firebase/firebase.utils'

class App extends Component {
  constructor() {
    super();

    this.state = {
        currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      })

      console.log(user)
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
          <Header currentUser = {this.state.currentUser}/>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path = '/shop' component = {ShopPage} />
            <Route exact path = '/login' component = {SignInAndSignUpPage} />
          </Switch>
      </div>
    );
  }
}

export default App;
