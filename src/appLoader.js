import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import {rootReducer} from './reducers/rootReducer';
import {App} from './components/app';


//Startup code--
moment.locale('es');
const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
//--------------
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));