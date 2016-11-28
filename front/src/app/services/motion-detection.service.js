'use strict';

let context;
let canvas;
let callback;
let width;
const motionDetectionService = {
  active: false,
  start: function (video, smallCanvas, size, cb) {
    this.active = true;
    callback = cb;
    canvas = smallCanvas;
    width = size.width / 10;
    context = canvas.getContext('2d');
    window.requestAnimationFrame(motionDetectionService._draw);
  },

  _draw: function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    compareFrames(imageData, callback);

    if (motionDetectionService.active) {
      window.requestAnimationFrame(motionDetectionService._draw);
    }
  },
  stop: function () {
    this.active = false;
  }
};

let lastFrame = [];

function compareFrames(newImageData, callback) {
  if (lastFrame.length) {

    let data = newImageData.data;
    let rects = [];
    let dataLength = data.length;

    for (let i = dataLength; i -= 4;) {
      if (hasChanges(data, lastFrame, i)) {
        let j = i / 4;
        let x = j % width;
        let y = (j - x) / width;
        let l = rects.length;
        rects[l] = x * 10;
        rects[l + 1] = y * 10;
      }
    }

    //j 768, i 3072
    if (rects.length) {
      callback(rects);
    }
  }

  lastFrame = newImageData.data;
}

function hasChanges(data, last, i) {
  return fastAbs(data[i] - last[i]) > 30 ||
    fastAbs(data[i + 1] - last[i + 1]) > 30 ||
    fastAbs(data[i + 2] - last[i + 2]) > 30;
}

function fastAbs(v) {
  return (v ^ (v >> 31)) - (v >> 31);
}

export default motionDetectionService;
