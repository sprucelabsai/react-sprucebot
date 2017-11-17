'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require('../Input/Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
	var p = Object.assign({}, props);

	// set the proper tag
	p.tag = 'select';

	// build the class
	p.className = 'custom_dropdown ' + (p.className || '') + ' ';
	if (p.label) {
		p.className += ' with_label';
	}
	return _react2.default.createElement(_Input2.default, p);
};