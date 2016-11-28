'use strict';

const randomGenerator = {
  getUniqueCamId: function () {
    let typedArr = new Uint32Array(1);
    window.crypto.getRandomValues(typedArr);
    return typedArr[0];

  },

  getUniquePass: function () {
    let typedArr = new Uint8Array(1);
    window.crypto.getRandomValues(typedArr);
    return typedArr[0];
  }
};

export default randomGenerator;
