import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.scss';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends Component {
  constructor() {
    super();

    this.state = {
        currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {

              // calling 'snapahot' allows us to see if the document exists, and receive ID
              id: snapshot.id,

              // attaching the .data() method returns a full JSON object with the documents data
              ...snapshot.data()
            }
          })
        })
      }

      // user will be set to null
      this.setState({ currentUser: userAuth })
    })
  }

  // Must unmount to avoid any memory leaks in subscription
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
