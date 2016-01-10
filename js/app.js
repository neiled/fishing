import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import {my_getStore, my_getHistory} from './store/configureStore';


import HomePage from './components/pages/HomePage';

import App from './components/App';

const store = my_getStore(window.__INITIAL_STATE__);
const history = my_getHistory();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
