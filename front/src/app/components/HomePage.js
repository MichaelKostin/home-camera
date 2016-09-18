'use strict';

import React, { Component, PropTypes } from 'react';
import startShowing from '../services/video-stream.service';
import { addStream, destroyStream } from '../actions';
import { QVGA, VGA, HD, FULL_HD } from '../constants/app.constants';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.download = this.download.bind(this);
  }

  takePhoto() {
    this.props.takePhoto(this.refs.video, this.refs.canv);
  }

  download(event) {
    console.log(arguments);
  }

  componentWillUnmount() {
    if (this.props.streams.length) {
      this.props.destroyStream();
    }

  }

  render() {
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
            <video
              ref="video"
              width={this.props.size.width}
              height={this.props.size.height}
              autoPlay
              src={window.URL.createObjectURL(this.props.streams[0])}
              id="video"
            />
            <canvas
              ref="canv"
              width={this.props.size.width}
              height={this.props.size.height}
              style={{ visibility: 'hidden', position: 'absolute' }}
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
  setVideoSize: PropTypes.func.isRequired
};
