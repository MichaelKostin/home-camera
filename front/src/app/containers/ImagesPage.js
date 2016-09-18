'use strict';

import { connect } from 'react-redux';
import ImagesPage from '../components/ImagesPage';

const mapStateToProps = (state) => ({
  images: state.videoApp.photos
});

const mapDispatchToProps = (dispatch) => ({
  openImage: () => {console.log('openImage');},
  deleteImage: () => {console.log('deleteImage');}
});

const connectedImagesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesPage);

export default connectedImagesPage;
