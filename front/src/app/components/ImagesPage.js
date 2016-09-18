'use strict';
import React, { PropTypes } from 'react';

const ImagesPage = ({ images })=> (
  <div>
    <h1>Images page</h1>
    <p>Here you can see the images page</p>
    {images.map(img =>
      <img
        src={ img.data }
        key={ img.id } />
    )}
  </div>
);

export default ImagesPage;

ImagesPage.propTypes = {
  images: PropTypes.array.isRequired
};
