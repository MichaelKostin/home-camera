'use strict';

import mediaStreamService from '../services/video-stream.service';
import motionDetectionService from '../services/motion-detection.service';
import { Photo } from '../classes';
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
  return (dispatch, getState) => {
    const size = getState().app.size;
    return mediaStreamService.getUserMedia({ size })
      .then((stream) => {
        if (getState().app.streams.length) {
          dispatch(destroyStream());
        }

        return dispatch({
          type: ADD_STREAM,
          stream
        });
      })
      .catch((err) => dispatch(showError(err)));
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

export function showError(error) {
  return {
    type: ERROR,
    error: {
      message: error.message,
      stack: error.stack
    }
  };
}

export function startMotionDetection(video, canvas) {
  return (dispatch, getState)=> {
    const size = getState().app.size;
    dispatch({ type: START_MOTION_DETECTION });
    motionDetectionService.start(video, canvas, size, (data)=> dispatch(dispatchMotion(data)));
  };
}

export function dispatchMotion(motion) {
  return {
    type: DISPATCH_MOTION,
    motion
  };
}
