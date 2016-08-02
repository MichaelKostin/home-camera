'use strict';

const mediaService = {
  getUserMedia: function (options) {
    const mediaOptions = {
      video: options.video,
      audio: options.audio
    };

    // current realisation
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('new version getUserMedia');
      return navigator.mediaDevices.getUserMedia(mediaOptions);
    }

    //old versions
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mozGetUserMedia;
    if(navigator.getUserMedia) {

      console.log('old version getUserMedia');
      return new Promise(function(resolve, reject) {
        navigator.getUserMedia(mediaOptions, resolve, reject);
      });
    } else {
      return Promise.reject('getUserMedia not supported');
    }

  }
};

export default mediaService;