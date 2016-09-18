'use strict';

import mediaStream from '../services/video-stream.service';
import { Photo } from '../classes';
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
  return (dispatch, getState) => {
    const streams = getState().videoApp.streams;
    dispatch({
      type: SET_VIDEO_SIZE,
      size
    });
    if (streams.length) {
      console.log('hey')
      dispatch(addStream());
    }
  };
}

export function addStream() {

  return (dispatch, getState) => {
    const size = getState().videoApp.size;
    if (getState().videoApp.streams.length) {
      dispatch(destroyStream());
    }

    return new mediaStream({ size })
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
      stream.getTracks().forEach((track)=> {
        track.stop();
      });
    });

    dispatch({
      type: DESTROY_STREAM
    });
  };
}

export function takePhoto(video, canvas) {
  return (dispatch) => {
    dispatch({
      type: ADD_IMAGE,
      photo: new Photo(video, canvas)
    });
  };
}
