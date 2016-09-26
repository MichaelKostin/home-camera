'use strict';

import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => ({
  errors: state.app.errors
});

const connectedApp = connect(
  mapStateToProps
)(App);

export default connectedApp;
