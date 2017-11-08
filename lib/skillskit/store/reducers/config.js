"use strict";

/**
 * Config is a passthrough, only set inside of withStore as initialState
 */
module.exports = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return state;
};