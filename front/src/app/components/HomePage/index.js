'use strict';

import React, { Component, PropTypes } from 'react';
import startShowing from '../../services/video-stream.service';
import { addStream, destroyStream } from '../../actions';
import { QVGA, VGA, HD, FULL_HD } from '../../constants/app.constants';
import MotionMap from './MotionMap';
import VideoScreen from './VideoScreen';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.download = this.download.bind(this);
    this.startMotionDetection = this.startMotionDetection.bind(this);
  }

  takePhoto() {
    this.props.takePhoto(this.refs.video.refs.component, this.refs.screenshotCanvas);
  }

  download(event) {
    console.log(arguments);
  }

  startMotionDetection() {
    this.props.startMotionDetection(this.refs.video.refs.component, this.refs.motions);
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
            <button onClick={this.startMotionDetection}>Start Motion detection</button>
            <div
              className="video-wrapper"
              style={{ height: this.props.size.height + 'px', width: this.props.size.width + 'px'}}
            >
              <VideoScreen
                ref="video"
                stream={this.props.streams[0]}
                size={this.props.size}
              />
              <canvas
                ref="screenshotCanvas"
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
                className="motion-detector"
                width={this.props.size.width / 10}
                height={this.props.size.height / 10}
              />
            </div>
          </div>
        ) : (<div>
          <p>Press "start" for playing video stream. Allow camera access for the site</p>
          <div className="paired-buttons">
            <div className="center">
              <button className="main-button" id="start" onClick={this.props.addStream}>Start</button>
              <div class="video-resolutions">
                <button
                  className={this.props.size === QVGA ? 'active' : ''}
                  onClick={()=> this.props.setVideoSize(QVGA)}
                  title={QVGA.width + 'x' + QVGA.height}
                >QVGA</button>
                <button
                  className={this.props.size === VGA ? 'active' : ''}
                  onClick={()=> this.props.setVideoSize(VGA)}
                  title={VGA.width + 'x' + VGA.height}
                >VGA</button>
                <button
                  className={this.props.size === HD ? 'active' : ''}
                  onClick={()=> this.props.setVideoSize(HD)}
                  title={HD.width + 'x' + HD.height}
                >HD</button>
                <button
                  className={this.props.size === FULL_HD ? 'active' : ''}
                  onClick={()=> this.props.setVideoSize(FULL_HD)}
                  title={FULL_HD.width + 'x' + FULL_HD.height}
                >FULL HD</button>
              </div>
            </div>
            <div className="center">
              <button className="main-button" id="connect">connect</button>
            </div>
          </div>


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
