import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.scss';

import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'

const App = () => {
  return (
    <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path = '/shop' component = {ShopPage} />
        </Switch>
    </div>
  );
}

export default App;
