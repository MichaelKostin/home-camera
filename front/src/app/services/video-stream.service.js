'use strict';

import mediaService from './media.service';

export default function mediaStream(options) {
  return mediaService.getUserMedia({ audio: false, video: true })
    .then(function(stream) {
      return stream;
      //component.setState({
      //  videoSrc: URL.createObjectURL(stream),
      //  stream: stream
      //});
      //document.querySelector('#video2').src = window.URL.createObjectURL(stream);

      //component.refs.video.src = window.URL.createObjectURL(stream);

    })
    .catch(function(err) {
      console.log("The following error occurred: ", err);
    });
}