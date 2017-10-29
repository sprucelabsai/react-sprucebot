'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _templateObject = _taggedTemplateLiteral([''], ['']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var Paragraph = _styledComponents2['default'].p.attrs({
	className: function className(props) {
		return props.fine ? 'fine__print' : '';
	}
})(_templateObject);

exports.Paragraph = Paragraph;
var H1 = _styledComponents2['default'].h1.attrs({
	className: function className(props) {
		return props.header ? 'with__subheader' : '';
	}
})(_templateObject);
exports.H1 = H1;
var H2 = _styledComponents2['default'].h2.attrs({
	className: function className(props) {
		return props.subheader ? 'is__subheader' : '';
	}
})(_templateObject);
exports.H2 = H2;
var H3 = _styledComponents2['default'].h3(_templateObject);
exports.H3 = H3;
var H4 = _styledComponents2['default'].h4(_templateObject);
exports.H4 = H4;
var H5 = _styledComponents2['default'].h5(_templateObject);
exports.H5 = H5;
var H6 = _styledComponents2['default'].h6(_templateObject);

exports.H6 = H6;
var A = _styledComponents2['default'].a(_templateObject);
exports.A = A;