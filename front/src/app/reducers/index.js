'use strict';

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {
  PLAY_VIDEO,
  STOP_VIDEO,
  SET_VIDEO_SIZE,
  ADD_STREAM,
  DESTROY_STREAM
} from '../constants/action.constants';

const initialState = {
  streams: [],
  streamIsFetching: false,
  size: { width: 320, height: 240 },
  motionDetection: false,
  photos: [],
  videos: [],
  videoStream: false
};

function videoApp(state = initialState, action) {

  switch (action.type) {
    case PLAY_VIDEO:
      return Object.assign({}, state, { videoStream: true });
    break;
    case STOP_VIDEO:
      return Object.assign({}, state, { videoStream: false });
      break;
    case ADD_STREAM:
      return Object.assign({}, state, { streams: [ ...state.streams, action.stream] });
      break;
    case DESTROY_STREAM:
      return Object.assign({}, state, { streams: [] });
      break;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  videoApp,
  routing
});

export default rootReducer;
