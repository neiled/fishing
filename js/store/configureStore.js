import rootReducer from '../reducers';
import DevTools from '../components/DevTools';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { syncHistory, routeReducer } from 'redux-simple-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
//
const history = createHistory();
const middlewareHistory = syncHistory(history);


const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routeReducer
}));

//
const finalCreateStore = compose(
  applyMiddleware(thunk, middlewareHistory),
  DevTools.instrument()
)(createStore);



export function my_getStore(initialState) {
  const store = finalCreateStore(reducer, initialState);
  middlewareHistory.syncHistoryToStore(store);
  //
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }


  return store;
}

export function my_getHistory() {
  return history;
}
