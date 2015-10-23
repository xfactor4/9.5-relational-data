import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Create from './components/create';
import Index from './components/index';
import Login from './components/login';

import store from './store';

console.log(store);
console.log(store.getRecipesCollection());

function requireAuth(nextState, replaceState) {
  if( ! store.getSession().isAuthenticated() ) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

function requireNotAuth(nextState, replaceState) {
  if(store.getSession().isAuthenticated()) {
    replaceState({}, '/');
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} onEnter={requireAuth} />
      <Route path="create" component={Create} onEnter={requireAuth} />

      <Route path="login" component={Login} onEnter={requireNotAuth} />
    </Route>
  </Router>
), document.getElementById('application'));
