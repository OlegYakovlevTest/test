import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './containers/App';
import { AboutAuthor, Authorization, Home, Map } from './components';
import $ from 'jquery';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

$.ajaxSetup({
    beforeSend: function(xhr) {
        const token = localStorage.getItem('token');
        if (token) {
            xhr.setRequestHeader('Authorization', 'JWT ' + token);
        }
    }
});

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='home' component={Home} />
                <Route path='auth' component={Authorization} />
                <Route path='about' component={AboutAuthor} />
                <Route path='map' component={Map} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);