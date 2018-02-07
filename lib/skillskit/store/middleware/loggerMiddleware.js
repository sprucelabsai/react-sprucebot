"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loggerMiddleware;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function loggerMiddleware() {
	return function (_ref) {
		var getState = _ref.getState;

		var _getState = getState(),
		    config = _getState.config;

		return function (next) {
			return function (action) {
				if (config.DEV_MODE) {
					var type = action.type,
					    types = action.types,
					    rest = _objectWithoutProperties(action, ["type", "types"]);

					console.log("Action " + (type || types), rest);
				}
				next(action);
			};
		};
	};
}