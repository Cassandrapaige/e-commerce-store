import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.scss';

import Homepage from './pages/homepage/homepage.component'

const App = () => {
  return (
    <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
        </Switch>
    </div>
  );
}

export default App;
