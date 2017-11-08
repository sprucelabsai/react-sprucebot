"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loggerMiddleware;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var loggingEnabled = false;

function loggerMiddleware() {
	return function () {
		return function (next) {
			return function (action) {
				if (loggingEnabled) {
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