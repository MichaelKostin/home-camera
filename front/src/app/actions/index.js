'use strict';

import mediaStream from '../services/video-stream.service';
import {
  PLAY_VIDEO,
  STOP_VIDEO,
  SET_VIDEO_SIZE,
  ADD_STREAM,
  DESTROY_STREAM,
  ADD_IMAGE
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
        return dispatch({
          type: ADD_STREAM,
          stream
        });
      });
  }
}

export function destroyStream() {
  return (dispatch, getState) => {
    const streams = getState().videoApp.streams;
    streams.forEach((stream) => {
      //TODO: Check with two cams.
      stream.getVideoTracks()[0].stop();
    });

    dispatch({
      type: DESTROY_STREAM
    });
  };
}

export function takePhoto(video, canvas) {
  return (dispatch) => {
    canvas
      .getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);
    dispatch({
      type: ADD_IMAGE,
      photo: canvas.toDataURL('image/png')
    });
  };
}
