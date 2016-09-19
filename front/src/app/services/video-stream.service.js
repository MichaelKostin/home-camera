'use strict';

import 'webrtc-adapter';

const mediaStreamService =  {

  getUserMedia: function (options) {
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
  }
};

export default mediaStreamService;
