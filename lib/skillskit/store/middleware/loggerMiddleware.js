"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loggerMiddleware;
function loggerMiddleware() {
	return function (_ref) {
		var getState = _ref.getState;

		var _getState = getState(),
		    config = _getState.config;

		return function (next) {
			return function (action) {
				next(action);
			};
		};
	};
}