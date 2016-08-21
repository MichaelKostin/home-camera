'use strict';

import mediaService from './media.service';

export default function mediaStream(options) {
  return mediaService.getUserMedia({ audio: false, video: true })
    .then((stream)=> stream)
    .catch((err)=> {
      console.log('The following error occurred: ', err);
    });
};
