'use strict';

import {
  PLAY_VIDEO,
  STOP_VIDEO,
  SET_VIDEO_SIZE
} from '../constants/action.constants';

export function playVideo() {
  return {
    type: PLAY_VIDEO
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