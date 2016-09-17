'use strict';

import { connect } from 'react-redux';
import { addStream, destroyStream, takePhoto } from '../actions';
import HomePage from '../components/HomePage';

const mapStateToProps = (state) => ({
  streams: state.videoApp.streams,
  images: state.videoApp.photos,
  size: state.videoApp.size
});

const mapDispatchToProps = (dispatch) => ({
  addStream: ()=> dispatch(addStream()),
  destroyStream: ()=> dispatch(destroyStream()),
  takePhoto: (video, canvas)=> dispatch(takePhoto(video, canvas))
});

const connectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default connectedHomePage;
