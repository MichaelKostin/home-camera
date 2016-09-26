'use strict';

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { VGA } from '../constants/app.constants';
import {
  PLAY_VIDEO,
  STOP_VIDEO,
  SET_VIDEO_SIZE,
  ADD_STREAM,
  DESTROY_STREAM,
  ADD_IMAGE,
  ERROR,
  START_MOTION_DETECTION,
  DISPATCH_MOTION
} from '../constants/action.constants';

const initialState = {
  streams: [],
  streamIsFetching: false,
  size: VGA,
  motionDetection: false,
  photos: [],
  videos: [],
  videoStream: false,
  errors: [],
  currentMotion: []
};

function app(state = initialState, action) {

  //Should be divided
  switch (action.type) {
    case PLAY_VIDEO:
      return Object.assign({}, state, { videoStream: true });
    break;
    case STOP_VIDEO:
      return Object.assign({}, state, { videoStream: false });
    break;
    case ADD_STREAM:
      return Object.assign({}, state, { streams: [...state.streams, action.stream] });
    break;
    case DESTROY_STREAM:
      return Object.assign({}, state, { streams: [] });
    break;
    case ADD_IMAGE:
      return Object.assign({}, state, { photos: [...state.photos, action.photo] });
    break;
    case SET_VIDEO_SIZE:
      return Object.assign({}, state, { size: action.size });
    break;
    case ERROR:
      return Object.assign({}, state, { errors: [...state.errors, action.error] });
    break;
    case START_MOTION_DETECTION:
      return Object.assign({}, state, { motionDetection: true });
    break;
    case DISPATCH_MOTION:
      return Object.assign({}, state, { currentMotion: action.motion });
    break;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  routing
});

export default rootReducer;
