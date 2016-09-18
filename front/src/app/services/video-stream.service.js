'use strict';

import 'webrtc-adapter';

export default function mediaStream(options) {
  return navigator.mediaDevices.getUserMedia({
    audio: false, video:  {
      width: { exact: options.size.width },
      height: { exact: options.size.height }
    }
  })
    .then((stream)=> stream)
    .catch((err)=> {
      throw new Error(err);
    });
};
