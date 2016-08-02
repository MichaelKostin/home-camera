'use strict';
import React from 'react';
import { Component } from 'react';
import startShowing from '../services/video-stream.service';
import store from '../store';
import { addStream, playVideo, stopVideo } from '../actions';

const StartButton = ({collback})=> (
  <div>
    <p>Press "start" for playing video stream. Allow camera access for the site</p>
    <button id="start" onClick={collback}>Start</button>
  </div>
);

const Video = ()=> (
  <div>
    <video ref="video" id="video"></video>
    <canvas id="draw"></canvas>
    <canvas className="hidden"></canvas>
  </div>
);

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.playVideo = this.playVideo.bind(this);
  }

  playVideo(e) {
    this.setState({
      videoStream: true
    });
    store.dispatch(addStream())
      .then(() => {
        this.setState(store.getState());
      });
  }

  componentWillUnmount() {
    //this.state.stream.getVideoTracks()[0].stop();
  }

  render() {
    return (
      <div id="home">
        {this.state.streams.length ? (
          <div>
            <video ref="video" autoPlay src={window.URL.createObjectURL(this.state.streams[0])} id="video"></video>
            <canvas id="draw"></canvas>
            <canvas className="hidden"></canvas>
          </div>
        ) : (<div>
          <p>Press "start" for playing video stream. Allow camera access for the site</p>
          <button id="start" onClick={this.playVideo}>Start</button>
        </div>)}
      </div>
    )
  }
};
