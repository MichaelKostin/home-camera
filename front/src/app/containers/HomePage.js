'use strict';

import { connect } from 'react-redux';
import { addStream, destroyStream, takePhoto, setVideoSize, startMotionDetection } from '../actions';
import HomePage from '../components/HomePage';

const mapStateToProps = (state) => ({
  streams: state.app.streams,
  images: state.app.photos,
  size: state.app.size,
  motionDetection: state.app.motionDetection,
  currentMotion: state.app.currentMotion
});

const mapDispatchToProps = (dispatch) => ({
  addStream: ()=> dispatch(addStream()),
  destroyStream: ()=> dispatch(destroyStream()),
  takePhoto: (video, canvas)=> dispatch(takePhoto(video, canvas)),
  setVideoSize: (size)=> dispatch(setVideoSize(size)),
  startMotionDetection: (video, canvas)=> dispatch(startMotionDetection(video, canvas))
});

const connectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default connectedHomePage;
