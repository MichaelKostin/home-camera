'use strict';
import React from 'react';
import { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.playVideo = this.playVideo.bind(this);

  }
  playVideo() {
    console.log('play video');
  }

  render() {
    return (
      <div id="home">
        <p>Press "start" for playing video stream. Allow camera access for the site</p>
        <button id="start" onClick={this.playVideo}>Start</button>
      </div>
    )
  }
};
