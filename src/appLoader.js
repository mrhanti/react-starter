import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {browserHistory, Router} from 'react-router';
import {AppContainer as HotReloader} from 'react-hot-loader';
import thunk from 'redux-thunk';
import moment from 'moment';


import {rootReducer} from './reducers';
import {routes} from './routes';

//---Startup code
moment.locale('es');
const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
//--------------

//---App initialization
const content = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);
const renderRoot = () => ReactDOM.render(
    <HotReloader>{content}</HotReloader>,
    document.getElementById('root')
);
renderRoot();

//---Hot Module Replacement
if (module.hot) module.hot.accept('./routes', renderRoot);