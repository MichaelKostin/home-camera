'use strict';

import React, { Component, PropTypes } from 'react';

export default class VideoScreen extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.size.height !== this.props.size.height;
  }

  render() {
    return (
      <video
        ref="component"
        width={this.props.size.width}
        height={this.props.size.height}
        autoPlay
        src={window.URL.createObjectURL(this.props.stream)}
        id="video"
      />
    );
  }
};
