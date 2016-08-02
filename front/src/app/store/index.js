'use strict';

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import logger from '../middlewares/logger';
import videoAPP from '../reducers'

export default createStore(
  videoAPP,
  compose(
    applyMiddleware(
      thunkMiddleware,
      logger
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
);
