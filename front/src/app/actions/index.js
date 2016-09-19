'use strict';

import mediaStreamService from '../services/video-stream.service';
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
    const streams = getState().app.streams;
    dispatch({
      type: SET_VIDEO_SIZE,
      size
    });
    if (streams.length) {
      dispatch(addStream());
    }
  };
}

export function addStream() {

  return (dispatch, getState) => {
    const size = getState().app.size;
    if (getState().app.streams.length) {
      dispatch(destroyStream());
    }

    return mediaStreamService.getUserMedia({ size })
      .then((stream) => (
         dispatch({
            type: ADD_STREAM,
            stream
          })
      ));
  };
}

export function destroyStream() {
  return (dispatch, getState) => {
    const streams = getState().app.streams;
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
