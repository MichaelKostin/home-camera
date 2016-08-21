'use strict';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { Router, Route, IndexRoute, Link, browserHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const store = configureStore();
const history = syncHistoryWithStore(appHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
