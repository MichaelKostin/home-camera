'use strict';
import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory, useRouterHistory } from 'react-router';
import Home from './components/Home';
import App from './components/app';
import VideosPage from './components/videos';
import ImagesPage from './components/images';
import NotFound from './components/NotFound';
import { createHashHistory } from 'history'

// for /#/ in url
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


export default class Routes extends React.Component {
  render() {
    return (
      <Router history={appHistory} >
        <Route path="/" component={App} >
          <IndexRoute component={Home} />
          <Route path="videos" component={VideosPage}/>
          <Route path="images" component={ImagesPage}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
};