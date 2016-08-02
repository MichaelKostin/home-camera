'use strict';

import mediaStream from '../services/video-stream.service';
import {
  PLAY_VIDEO,
  STOP_VIDEO,
  SET_VIDEO_SIZE,
  ADD_STREAM,
  DESTROY_STREAM
} from '../constants/action.constants';

export function playVideo() {
  return {
    type: PLAY_VIDEO,
    isFetching: true
  };
}

export function stopVideo() {
  return {
    type: STOP_VIDEO
  };
}

export function setVideoSize(size) {
  return {
    type: SET_VIDEO_SIZE,
    size
  };
}

export function addStream() {

  return (dispatch) => {
    return new mediaStream()
      .then((stream) => {
        return dispatch( {
          type: ADD_STREAM,
          stream
        });
      });
  }
}

export function destroyStream() {
  return (dispatch, getState) => {
    const streams = getState().streams;
    streams.forEach((stream) => {
      //TODO: Check with two cams.
      stream.getVideoTracks()[0].stop();
    });

    dispatch({
      type: DESTROY_STREAM
    })
  };
}