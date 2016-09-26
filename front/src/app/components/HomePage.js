'use strict';

import React, { Component, PropTypes } from 'react';
import startShowing from '../services/video-stream.service';
import { addStream, destroyStream } from '../actions';
import { QVGA, VGA, HD, FULL_HD } from '../constants/app.constants';

class MotionMap extends Component {
  constructor (...props) {
    super(props);
    console.log(this.refs.currentMotion);
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    if (this.props.currentMotion.length) {
      this.refs.currentMotion.width = this.props.size.width;
      this.refs.currentMotion.height = this.props.size.height;
      let context = this.refs.currentMotion.getContext('2d');
      context.fillStyle = 'rgba(255, 0, 0, .3)';
      window.requestAnimationFrame(()=> {
        for (let i = this.props.currentMotion.length; i -=2;) {
          context.fillRect(this.props.currentMotion[i-2], this.props.currentMotion[i-1], 10 , 10);
        }

      });

        setTimeout(()=> {
          for (let i = this.props.currentMotion.length; i -=2;) {
            context.clearRect(this.props.currentMotion[i-2], this.props.currentMotion[i-1], 10 , 10);
          }
        }, 400);
    }
    return (
      <canvas
        ref="currentMotion"
        width={this.props.size.width}
        height={this.props.size.height}
        style={{ position: 'absolute', background: 'none' }}
      />
    );
  };
}

class Video extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.size.height !== this.props.size.height;
  }

  render() {
    console.log('hello');
    return (
      <video
        ref="video"
        width={this.props.size.width}
        height={this.props.size.height}
        autoPlay
        src={window.URL.createObjectURL(this.props.stream)}
        id="video"
      />
    );
  }
}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.download = this.download.bind(this);
    this.startMotionDetection = this.startMotionDetection.bind(this);
  }

  takePhoto() {
    this.props.takePhoto(this.refs.video, this.refs.canv);
  }

  download(event) {
    console.log(arguments);
  }

  startMotionDetection() {
    this.props.startMotionDetection(this.refs.video, this.refs.motions);
  }

  componentWillUnmount() {
    if (this.props.streams.length) {
      this.props.destroyStream();
    }

  }

  render() {
    if (this.props.currentMotion && this.refs.currentMotion) {
      console.log('this.props.currentMotion', this.props.currentMotion);

    }

    return (
      <div id="home">
        {this.props.streams.length ? (
          <div>
            <button onClick={this.props.destroyStream}>close</button>
            <button onClick={this.takePhoto}>screenshot</button>
            <button onClick={()=> this.props.setVideoSize(QVGA)}>QVGA</button>
            <button onClick={()=> this.props.setVideoSize(VGA)}>VGA</button>
            <button onClick={()=> this.props.setVideoSize(HD)}>HD</button>
            <button onClick={()=> this.props.setVideoSize(FULL_HD)}>FULL HD</button>
            <button onClick={this.startMotionDetection}>Start Motion detection</button>
            <Video
              stream={this.props.streams[0]}
              size={this.props.size}
            />
            <canvas
              ref="canv"
              width={this.props.size.width}
              height={this.props.size.height}
              style={{ visibility: 'hidden', position: 'absolute' }}
            />
            <MotionMap
              size={this.props.size}
              currentMotion={this.props.currentMotion}
            />
            <canvas
              ref="motions"
              width={this.props.size.width / 10}
              height={this.props.size.height / 10}
              style={{ outline: '1px solid red' }}
              />
          </div>
        ) : (<div>
          <p>Press "start" for playing video stream. Allow camera access for the site</p>
          <button id="start" onClick={this.props.addStream}>Start</button>
        </div>)}

        {
          this.props.images.map((img, index)=>
            <img
              key={ index }
              src={ img.data }
              alt={ 'Photo' + img.time }
              onClick={this.download}
            />
          )
        }
      </div>
    );
  }
};

HomePage.propTypes = {
  addStream: PropTypes.func.isRequired,
  streams: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  takePhoto: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
  setVideoSize: PropTypes.func.isRequired,
  startMotionDetection: PropTypes.func.isRequired
};
