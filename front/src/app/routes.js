'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/HomePage';
import App from './components/App';
import VideosPage from './components/VideosPage';
import ImagesPage from './components/ImagesPage';
import NotFound from './components/NotFound';
import { createHashHistory } from 'history';

// for /#/ in url
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default (
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="videos" component={VideosPage}/>
        <Route path="images" component={ImagesPage}/>
        <Route path="*" component={NotFound}/>
      </Route>
);
