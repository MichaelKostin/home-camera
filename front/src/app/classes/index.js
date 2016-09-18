'use strict';

export class Photo {
  constructor(video, canvas) {
    canvas
      .getContext('2d')
      .drawImage(video, 0, 0, canvas.width, canvas.height);
    this.id = (new Date()).getTime();
    this.time = new Date();
    this.data = canvas.toDataURL('image/png');
    this.metadata = {};
  }

  //if no methods, Photo should be as literal object.
}
