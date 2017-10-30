'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.A = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Paragraph = undefined;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = exports.Paragraph = _styledComponents2.default.p.attrs({
	className: function className(props) {
		return props.fine ? 'fine__print' : '';
	}
}).withConfig({
	displayName: 'Typeography__Paragraph',
	componentId: 's1mw30ba-0'
})(['']);

var H1 = exports.H1 = _styledComponents2.default.h1.attrs({
	className: function className(props) {
		return props.with_subheader ? 'with__subheader' : '';
	}
}).withConfig({
	displayName: 'Typeography__H1',
	componentId: 's1mw30ba-1'
})(['']);
var H2 = exports.H2 = _styledComponents2.default.h2.attrs({
	className: function className(props) {
		return props.subheader ? 'is__subheader' : '';
	}
}).withConfig({
	displayName: 'Typeography__H2',
	componentId: 's1mw30ba-2'
})(['']);
var H3 = exports.H3 = _styledComponents2.default.h3.withConfig({
	displayName: 'Typeography__H3',
	componentId: 's1mw30ba-3'
})(['']);
var H4 = exports.H4 = _styledComponents2.default.h4.withConfig({
	displayName: 'Typeography__H4',
	componentId: 's1mw30ba-4'
})(['']);
var H5 = exports.H5 = _styledComponents2.default.h5.withConfig({
	displayName: 'Typeography__H5',
	componentId: 's1mw30ba-5'
})(['']);
var H6 = exports.H6 = _styledComponents2.default.h6.withConfig({
	displayName: 'Typeography__H6',
	componentId: 's1mw30ba-6'
})(['']);

var A = exports.A = _styledComponents2.default.a.withConfig({
	displayName: 'Typeography__A',
	componentId: 's1mw30ba-7'
})(['']);