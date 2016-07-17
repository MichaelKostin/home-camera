/*
'use strict';

const mediaService = require('./services/media.service');

const React = require('react');
const ReactDOM = require('react-dom');

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: 'bin'}


  }

  render() {
    console.log('render');
    return (
      <div>
        <Counter/>
        Hey, Nigga!</div>
    )
  }
}

ReactDOM.render(
  <MyComponent/>,
  document.getElementById('app')
);

document.querySelector('.start').addEventListener('click', startShowing);
document.querySelector('.connect').addEventListener('click', connect);
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var secondCanvas = document.querySelector('#motions');
secondCanvas.width = 1280;
secondCanvas.height = 720;
var ctx = secondCanvas.getContext('2d');
ctx.fillStyle = 'rgba(255, 0, 0, .3)';
window.ctx = ctx;
let lastFrame = [];
var log = []
window.lastFrame = lastFrame;
function startShowing() {
  mediaService.getUserMedia({ audio: false, video: {width: {exact: 1280}, height: {exact: 720}} })
    .then(function(stream) {
      window.stream = stream;
      video.src = window.URL.createObjectURL(stream);
      window.requestAnimationFrame(draw);

    })
    .catch(function(err) {
      console.log("The following error occurred: ", err);
    });
}

function connect() {
  canvas.width = video.videoWidth /2;
  canvas.height = video.videoHeight /2;

  canvas
    .getContext('2d')
    .drawImage(video, 0, 0, canvas.width, canvas.height);

}

function draw() {
  canvas.width = video.videoWidth /20;
  canvas.height = video.videoHeight /20;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
try {
  let imageData = context.getImageData( 0, 0, video.videoWidth /20, video.videoHeight /20)
  //console.time('hello');
  //for(var a = 100000; a > 0; a--) {
    compareFrames(imageData);
  //}
  //console.timeEnd('hello');

} catch(e) {
  console.log(e)
}


  window.requestAnimationFrame(draw);
}

function compareFrames(newImageData) {
  if(lastFrame.length) {

    let data = newImageData.data;
    let rects = [];
    let dataLength = data.length;

    for (let i = dataLength; i -= 4;) {
      if(hasChanges(data, lastFrame, i)){
        let j = i / 4;
        let x = j % 32;
        let y = (j - x) / 32;
        let l = rects.length;
        rects[l] = x * 10;
        rects[l + 1] = y *10;
        //rects[l] = 'x';
        //rects[l + 1] = 'y';
      }
    }
    //debugger;
    //j 768, i 3072
    if(rects.length) {
      window.requestAnimationFrame(()=> {
        for (let i = rects.length; i -=2;) {
          ctx.fillRect(rects[i-2], rects[i-1], 10 , 10);
        }

      });

        window.requestAnimationFrame(()=>{
          setTimeout(()=> {
            for (let i = rects.length; i -=2;) {
              ctx.clearRect(rects[i-2], rects[i-1], 10 , 10);
            }
          }, 400)

        });
    }
  }

  lastFrame = newImageData.data;
}

function hasChanges(data, last, i) {
    return fastAbs(data[i] - last[i]) > 30 ||
      fastAbs(data[i+1] - last[i+1]) > 30 ||
      fastAbs(data[i+2] - last[i+2]) > 30;
}

function fastAbs(v) {
  return (v ^ (v >> 31)) - (v >> 31);
}*/
