import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import AboutAuthor from './components/AboutAuthor'
import Authorization from './components/Authorization'
import Home from './components/Home'
import Map from './components/Map'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='home' component={Home} />
            <Route path='auth' component={Authorization} />
            <Route path='about' component={AboutAuthor} />
            <Route path='map' component={Map} />
        </Route>
    </Router>,
    document.getElementById('root')
)