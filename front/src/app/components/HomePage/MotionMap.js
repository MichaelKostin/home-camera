'use strict';

import React, { Component, PropTypes } from 'react';

export default class MotionMap extends Component {
  updateCanvas() {
    if (this.props.currentMotion.length) {
      let context = this.refs.currentMotion.getContext('2d');
      this.refs.currentMotion.width = this.props.size.width;
      this.refs.currentMotion.height = this.props.size.height;
      context.fillStyle = 'rgba(255, 0, 0, .3)';

      window.requestAnimationFrame(()=> {
        for (let i = this.props.currentMotion.length; i -= 2;) {
          context.fillRect(this.props.currentMotion[i - 2], this.props.currentMotion[i - 1], 10, 10);
        }

      });

      setTimeout(() => {
        for (let i = this.props.currentMotion.length; i -= 2;) {
          context.clearRect(this.props.currentMotion[i - 2], this.props.currentMotion[i - 1], 10, 10);
        }
      }, 800);
    }
  }

  componentDidMount() {
    this.updateCanvas();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentMotion.length) {
      this.updateCanvas();
    }

    return nextProps.size.height !== this.props.size.height;
  }

  render() {
    return (
      <canvas
        ref="currentMotion"
        className="motion-mapping"
        width={this.props.size.width}
        height={this.props.size.height}
        style={{ position: 'absolute' }}
      />
    );
  };
};
